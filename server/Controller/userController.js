const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    var usr = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    };
    created_user = await userModel.create(usr);
    res.status(201).json({ success: true, created_user, message: "Registration successful" });
}


exports.signin = async (req, res) => {
    // console.log(req.body);
    const userRes = await userModel.findOne({ where: { email: req.body.email } })
    console.log("login page: ", userRes.password)
    if (!userRes) {
        res.status(400).json({ error: 'Invalid email' })
        return;
    }
    else {
        const isPasswordVerified = bcrypt.compareSync(req.body.password, userRes.password);
        if (isPasswordVerified) {
            const token = jwt.sign({ userId: userRes.id, email: userRes.email }, "secrete", { expiresIn: "1h" });
            res.status(200).json({ success: true, userdata: userRes, token, message: "Login successfully!" })
        } else {
            res.status(400).json({ error: 'Invalid Password' })
            return;
        }

    }
}

