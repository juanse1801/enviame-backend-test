import { User } from "../models/User.js";

const signUpUser = async (req, res) => {
  try {
    const { email, password, address } = req.body;
    const newUser = await User.create({
      email,
      password,
      address,
    });
    res.json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export { signUpUser };
