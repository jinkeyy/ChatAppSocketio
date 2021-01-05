const bcrypt = require('bcrypt')
var cookieSession = require('cookie-session')
var express = require('express')
var app = express()
const User = require('../model/user');
module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                    // store user session, will talk about it later
                    console.log("đăng nhập thành công chào" + req.body.username)
                    res.cookie('user', req.body.username, { maxAge: 900000, httpOnly: false });
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