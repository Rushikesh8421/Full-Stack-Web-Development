const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
  socketTimeoutMS: 30000, // Increase the socket timeout to 30 seconds
})
  .then(() => {
    const fruitSchema = new mongoose.Schema({
      name: String,
      rating: Number,
      review: String
    });

    const Fruit = mongoose.model("Fruit", fruitSchema);

    const fruit = new Fruit({
      name: "Apple",
      rating: 7,
      review: "An apple a day keeps a doctor away."
    });

    fruit.save()
      .then(() => {
        console.log('Fruit saved successfully!');
        mongoose.connection.close(); // Close the connection after saving
      })
      .catch(error => {
        console.error('Error saving fruit:', error);
      });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
