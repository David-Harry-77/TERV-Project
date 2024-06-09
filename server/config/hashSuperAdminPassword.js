const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');

const password = 'HelloWorld'; // Replace with your desired superadmin password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, async function(err, hash) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    try {
      await mongoose.connect('mongodb://localhost:27017/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      await User.create({
        email: "superadmin@example.com",
        password: hash,
        role: "superadmin"
      });

      console.log('Superadmin created successfully with hashed password:', hash);
      process.exit(0);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }
});
