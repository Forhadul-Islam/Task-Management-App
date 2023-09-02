/* eslint-disable no-useless-escape */
import bcrypt from "bcryptjs";
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("B4c0/\/", salt);

export const hashPassword = (password) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (!err) {
        return hash;
      }
      return console.log({ err });
    });
  });
};

export const comparePasswords = (plaintextPassword, hashedPassword) => {
  bcrypt.compare(plaintextPassword, hashedPassword, (err, result) => {
    if (!err) {
      return result;
    }

    return console.log({ err });
  });
};
