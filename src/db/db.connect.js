import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to MongoDB!!");
    });
  } catch (error) {
    console.log(`Error occured while connecting to Mongodb !! ${error}`);
  }
};

export default dbConnect;
