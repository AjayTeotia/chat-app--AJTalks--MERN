import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.log(`Error connecting to MongonDB: ${error}`);
  }
};

export default connectToMongoDB;
