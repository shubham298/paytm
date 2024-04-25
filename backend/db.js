const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
//mongodb+srv://<username>:<password>@beyondthebasics.abcde.mongodb.net/db-name-here
const {MONGO_URI} = require('./config')
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const UserSchema = new mongoose.Schema({ 
    firstName: { 
        type: String, 
        require: true
    }, 
    lastName: { 
        type: String, 
        require: true
    },
    userName: { 
        type: String, 
        require: true
    },
    password: { 
        type: String, 
        require: true
    },
    password_hash: {
        type: String, 
        require: true
    }
}) 

UserSchema.methods.createHash = async function (plainTextPassword) {

    // Hashing user's salt and password with 10 iterations,
    const saltRounds = 10;
  
    // First method to generate a salt and then create hash
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  
    // Second mehtod - Or we can create salt and hash in a single method also
    // return await bcrypt.hash(plainTextPassword, saltRounds);
};
// Validating the candidate password with stored hash and hash function
UserSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash);
  };
  
const User = new mongoose.model("User", UserSchema)


const AccountSchema = new mongoose.Schema({ 
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        require: true
    }, 
    balance: { 
        type: Number, 
        require: true
    }
}) 
const Accounts = new mongoose.model("Accounts", AccountSchema)


module.exports = {User , Accounts};


// const User_1 = new User({ 
//    firstName: 'SHUBHAM',
//    lastName: 'DOGRA',
//    password: '12345678'
// }); 
  
// User_1.save();