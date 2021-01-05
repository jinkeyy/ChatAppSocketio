const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Chats = new Schema({
    message: [{
        content: String,
        CreatedAt: Date,
        Owner: String,
    }]
});
// export model
const Chats = mongoose.model('Chats', Chats);
module.exports = Chats