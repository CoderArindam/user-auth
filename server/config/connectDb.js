import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "userdetails",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("connected successfully!");
  } catch (e) {
    console.log(e);
  }
};

export default connectDb;
