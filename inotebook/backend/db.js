const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true, 
            // useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB  successfully Rohit vikram");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToMongo;

