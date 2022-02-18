import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Error intializing database");
  }
};

export default dbConnection;
