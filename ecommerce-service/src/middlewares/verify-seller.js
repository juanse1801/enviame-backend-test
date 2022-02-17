const verifySeller = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    }
    const { rol } = req.user;
    if (rol === "SELLER") {
      next();
    } else {
      return res.status(401).send({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifySeller;
