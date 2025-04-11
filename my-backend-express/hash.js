const bcrypt = require('bcrypt');

const plainPassword = 'tonmotdepasse';
bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash bcrypt :', hash);
});
