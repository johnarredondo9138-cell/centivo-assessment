require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await User.deleteMany({});
    
    const users = [
      { name: 'John Doe', email: 'john@email.com', age: 30 },
      { name: 'Jane Smith', email: 'jane@email.com', age: 25 },
      { name: 'Bob Johnson', email: 'bob@email.com', age: 20 }, // Will be filtered out
      { name: 'Alice Brown', email: 'alice@email.com', age: 18 } // Will be filtered out
    ];
    
    await User.insertMany(users);
    console.log('Sample data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();