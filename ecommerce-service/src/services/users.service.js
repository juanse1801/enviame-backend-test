import { User } from "../models/User.js";
import generateToken from "../helpers/generate-token.js";

const signUpUser = async (req, res) => {
  try {
    const { email, password, address, name } = req.body;
    const newUser = await User.create({
      email,
      name,
      password,
      address,
    });
    res.json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const SingIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    const token = await generateToken(user.id, user.name, user.rol);
    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const listSellers = async (req, res) => {
  try {
    const allSeller = await User.findAll({ where: { rol: "SELLER" } });
    res.json(allSeller);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSeller = async (req, res) => {
  try {
    const { id } = req.query;
    const getSeller = await User.findByPk(id);
    if (getSeller) {
      res.json(getSeller);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createSeller = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await User.create({
      email,
      password,
      name,
      rol: "SELLER",
    });
    res.json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editSeller = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, address, email } = req.body;

    const sellerUser = await User.findByPk(id);
    if (sellerUser) {
      await User.update(
        { name: name, address: address, email: email },
        { where: { id: id } }
      );
      res.status(201).json({ message: `User ${id} was updated` });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const { id } = req.query;
    const sellerUser = await User.findByPk(id);
    if (sellerUser) {
      await User.destroy({ where: { id: id } });
      res.status(201).json({ message: `User ${id} was deleted` });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sellerInfo = async (req, res) => {
  try {
    const { id, rol } = req.user;
    if (rol === "SELLER") {
      const sellerUser = await User.findByPk(id);
      res.json(sellerUser);
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sellerOwnEdit = async (req, res) => {
  try {
    const { id, rol } = req.user;
    const { name, address } = req.body;
    if (rol === "SELLER") {
      await User.update({ name, address }, { where: { id: id } });
      res.status(201).json({ message: `User ${id} was updated` });
    } else {
      res.status(403).json({ message: "Unauthorizaed" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  signUpUser,
  createSeller,
  SingIn,
  listSellers,
  getSeller,
  editSeller,
  deleteSeller,
  sellerInfo,
  sellerOwnEdit,
};
