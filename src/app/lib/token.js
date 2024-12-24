import jwt from "jsonwebtoken";
export const generateAccessToken = (data, expiresIn = "10s") => jwt.sign(data, "secreat", { expiresIn: expiresIn });
export const verifyAccessToken = (token) => {
  let user;
  jwt.verify(token, "secret", (err, data) => {
    if (err) {
      return err;
    }
    console.log(data);
    user = data;
  });

  return user;
};
