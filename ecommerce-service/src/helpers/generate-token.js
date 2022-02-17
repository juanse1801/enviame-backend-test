import jsonwebtoken from "jsonwebtoken";

const generateToken = (id, name, rol) => {
  return new Promise((resolve, reject) => {
    const payload = { id, name, rol };
    jsonwebtoken.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "12h",
      },
      (error, token) =>
        error ? reject(`Token Error: ${error}`) : resolve(token)
    );
  });
};

export default generateToken;
