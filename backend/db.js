const  mongoose  = require('mongoose')


mongoose.connect("mongodb+srv://ksanket114402:sanket@cluster0.ahfjlq1.mongodb.net/paytm-clone")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
});


//bank schema (linking the userid with the user)
const BankSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
	balance: {
        type : Number,
        required : true
    },
})

const User = mongoose.model("User",UserSchema);
const Account  =  mongoose.model("Account",BankSchema);

module.exports = {
    User,
    Account,
}