const User = require('../model/user.js')
module.exports = (req, res) => {
    if (req.body.password === req.body.rPassword) {
        User.create(req.body, (error, user) => {
            if (error) {
                console.log(error)
                return res.redirect('/register')
            }
            res.redirect('/login')
        })
    } else {
        console.log("Không trùng mật khẩu")
        return res.redirect('/register')
    }
}