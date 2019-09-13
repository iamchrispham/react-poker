// const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      id: 1,
      email: "nathan.keolasy@gmail.com",
      // hashed_pw: bcrypt.hashSync('nathan', 10);
      name: "Nathan Keolasy",
      phone: "210-777-7777",
      balanceHours: 10,
      qualifierHours: 25,
      access: 'admin',
      checkedIn: false,
      username: 'nathan.keolasy',
      nickname: '',
      picture: '',
      user_id: undefined
    },
    {
      id: 2,
      email: "steve@zenithservices.net",
      // hashed_pw: bcrypt.hashSync('stephen', 10);
      name: "Stephen Graham",
      phone: "210-666-6666",
      balanceHours: 300,
      qualifierHours: 9999,
      access: 'admin',
      checkedIn: false,
      username: 'steve',
      nickname: '',
      picture: '',
      user_id: undefined
    },
    {
      id: 3,
      email: "michaelwhitzel@gmail.com",
      // hashed_pw: bcrypt.hashSync('michael', 10);
      name: "Michael Whitzel",
      phone: "210-555-5555",
      balanceHours: 10,
      qualifierHours: 25,
      access: 'member',
      checkedIn: false,
      username: 'michaelwhitzel',
      nickname: '',
      picture: '',
      user_id: undefined
    },
    {
      id: 4,
      email: "keolazy1@gmail.com",
      // hashed_pw: bcrypt.hashSync('michael', 10);
      name: "Nathan Keolaskys",
      phone: "210-364-6666",
      balanceHours: 6,
      qualifierHours: 30,
      access: 'member',
      checkedIn: false,
      username: 'keolazy1',
      nickname: '',
      picture: '',
      user_id: undefined
    },
    {
      id: 5,
      email: "micwhi@gmail.com",
      // hashed_pw: bcrypt.hashSync('michael', 10);
      name: "Michelangelo Westchire",
      phone: "777-777-777",
      balanceHours: 4,
      qualifierHours: 15,
      access: 'member',
      checkedIn: false,
      username: 'michwhi',
      nickname: '',
      picture: '',
      user_id: undefined
    }
  ])
};


