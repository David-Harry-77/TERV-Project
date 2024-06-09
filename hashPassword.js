const bcrypt = require('bcryptjs');

const password = 'HelloWorld';  // Replace with your desired password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed Password:', hash);
  }
});
