const mongoose = require("mongoose");
const bcrypt =require("bcrypt")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Please add an email"],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        }
    },
    {
        timeStamps: true,
    }
);

userSchema.pre('save', async function (next) {
    try {
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  });
  
//   userSchema.methods.isValidPassword = async function (password) {
//     try {
//       return await bcrypt.compare(password, this.password);
//     } catch (error) {
//       throw createHttpError.InternalServerError(error.message);
//     }
//   };
  

module.exports=mongoose.model('User', userSchema);