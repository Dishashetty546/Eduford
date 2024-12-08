const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://dishashetty546:Disha123@cluster0.wg8sf.mongodb.net/myDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const collection = mongoose.model("collection", newSchema);

module.exports = collection;
