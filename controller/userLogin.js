const bcrypt = require('bcrypt')
const User = require('../model/user');
const login = require('./login');
module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                    // store user session, will talk about it later
                    res.redirect("/home")

                } else {
                    res.redirect('/login')
                }
            })
        } else {
            res.redirect('/login')
        }
    })
}