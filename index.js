const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const tasksRoute = require('./routes/tasks');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// user: pidugulavanya456
// password: iqBeH5aZu5LfJ1gG



// const mongoose = require('mongoose');
const uri = `mongodb+srv://pidugulavanya456:iqBeH5aZu5LfJ1gG@to-do-db.7hnj9.mongodb.net/?retryWrites=true&w=majority&appName=to-do-db`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);



// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(error => console.log(error));

// Routes
app.use('/api/tasks', tasksRoute);

// Start server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
