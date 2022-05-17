var User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const connectDB = require("../../config/db");
const { secret } = require("../../utils/config");

const UserResolvers = {
  Query: {
    async userLogin({ email, password }) {
      console.log("check", email, password);
      try {
        let user = await User.find({ email: email });

        if (user.length === 0) {
          return { message: "failure" };
        } else {
          return new Promise((resolve, reject) => {
            bcrypt.compare(password, user[0].password, function (err, isMatch) {
              if (err) {
                return reject(err);
              } else if (!isMatch) {
                return reject({ message: "failure" });
              } else {
                const payload = { email: user[0].email };
                const token = jwt.sign(payload, secret, {
                  expiresIn: 10080000,
                });

                return resolve({ token: "JWT " + token, user: user });
              }
            });
          });
        }
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    async registerUser({ name, email, password }) {
      try {
        console.log("Inside muation");
        let user = await User.findOne({ email });

        if (user) {
          return "failure";
        } else {
          user = new User({
            name,
            email,
            password,
          });
          const salt = await bcrypt.genSalt(10);

          user.password = await bcrypt.hash(password, salt);

          await user.save();
          console.log(user);
          return "successfully registered";
        }
      } catch (err) {
        return err;
      }
    },

    async editUser({
      email,
      name,
      password,
      city,
      dateofbirth,
      mobile,
      address,
      country,
      picture,
    }) {
      try {
        console.log("Inside muation");
        let result = await User.findOneAndUpdate(
          { email: email },
          {
            email,
            name,
            password,
            city,
            dateofbirth,
            mobile,
            address,
            country,
            picture,
          },
          { upsert: true, new: true }
        );
        let affectedRows = (await result._id) ? 1 : 0;
        console.log(result, affectedRows);
        return { success: true };
      } catch (err) {
        return err;
      }
    },
  },
};
module.exports = UserResolver;
