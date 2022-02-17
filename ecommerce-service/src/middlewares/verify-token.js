import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    }
    const token = req.headers.authorization.split(" ");
    if (!token) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication." });
    }
    const { id } = jwt.verify(token[1], process.env.SECRETKEY);
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ message: "Invalid Token." });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyToken;
