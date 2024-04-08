import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // required means no user will be created without having username
      unique: true, //every user should have unique user name
    },
    email: {
      type: String,
      required: true, // required means no user will be created without having username
      unique: true,
    },
    password: {
      type: String,
      required: true, //we didn't made password field as unique bcoz two users have same password ok!
    },
  },
  { timestamps: true }
); //timestamps true save the time of creation and updation of new user ok!

const User = mongoose.model('User', userSchema);
export default User;
