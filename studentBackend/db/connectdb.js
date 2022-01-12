import mongoose from "mongoose";

const connectDB = async (DATABESE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "school",
    };
    await mongoose.connect(DATABESE_URL, DB_OPTION);
    console.log("Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
