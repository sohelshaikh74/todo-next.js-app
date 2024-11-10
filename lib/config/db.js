import mongoose from "mongoose";

export const ConnectDb = async () => {
  mongoose.connect(
    "mongodb+srv://globostack:FLb0ma9TkSimGpsd@cluster0.qrpmm.mongodb.net/todo-app"
  );
  console.log("DB connected");
};
