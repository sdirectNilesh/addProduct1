const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



const generateRandomPassword = (length) => {

    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var currPassword = '';
    for (let i = 0; i < length; i++) {
        var charposition = Math.floor(Math.random() * characters.length);
        currPassword += characters.charAt(charposition);
        console.log("passw: ", currPassword);
    }
    return currPassword;
}

exports.forgotPassword = async (req, res) => {
    const userRes = await userModel.findOne({ where: { email: req.body.email } })
    const userEmail = req.body.email;
    console.log(userEmail);
    if (!userRes) {
        res.status(400).json({ error: 'Invalid Email' })
        return;
    }
    else {
        // Set up nodemailer transporter with Gmail's SMTP credentials
        const currPassword = generateRandomPassword(10);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(currPassword, salt);
        // updated_password = await userModel.update(password);
        userRes.password = password;
        await userRes.save()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sdirectnilesh@gmail.com',
                pass: 'qqmueyngzjuqpaba',
            },
        });
        //generate a password
        const mailOptions = {
            from: 'sdirectnilesh@gmail.com', // Sender email address (should match the email address used in the auth section)
            to: userEmail, // Recipient email address
            subject: 'Your Generated Password', // Email subject
            text: currPassword, // Email content
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        res.status(200).json({ success: true, message: "Password Sent Successfully" })
    }

}



exports.updatePassword = async (req, res) => {
    try {
        console.log(req.body);
        const userRes = await userModel.findOne({ where: { id: req.query.userId } })
        console.log("update: ", userRes.password)
        // console.log("update: ", userId);
        if (!userRes) {
            res.status(400).json({ error: 'Invalid Current Password' })
            return;
        }
        else {
            console.log("currpass: ", req.body.currPassword)
            const isPasswordVerified = bcrypt.compareSync(req.body.currPassword, userRes.password);
            if (isPasswordVerified) {
                const salt = await bcrypt.genSalt(10);
                // var pass = {
                //     newPassword: req.body.newPassword,
                //     confirmPassword: req.body.confirmPassword    
                // };
                if (req.body.newPassword === req.body.confirmPassword) {
                    let hashPwd = await bcrypt.hash(req.body.newPassword, salt);
                    userRes.password = hashPwd;
                    await userRes.save();
                    // res.status(201).json({ success: true, created_user, message: "Registration successful" });
                    res.status(200).json({ success: true, userdata: userRes, message: "Password Changed successfully!" })
                }
            } else {
                res.status(400).json({ error: 'Invalid Password' })
                return;
            }

        }
    } catch (error) {
        console.log("error: ", error);
    }
}