exports.seed = function(knex, Promise) {
  return knex("admins").insert([
    {
      email: "stephen@zenithservices.net",
      name: "Owner Person",
      phone: "512-777-7777",
      adminType: "admin",
      access: "admin",
      hashed_pw: "" // bcrypt.hashSync('owner', 10);
    },
    {
      email: "keolazy1@gmail.com",
      name: "Nathan Admin",
      phone: "987-654-3210",
      adminType: "admin",
      access: "admin",
      hashed_pw: "" // bcrypt.hashSync('admin', 10);
    },
    {
      email: "michaelwhitzel@gmail.com",
      name: "Michael Admin",
      phone: "987-654-3210",
      access: "admin",
      adminType: "admin",
      hashed_pw: "" // bcrypt.hashSync('admin', 10);
    }
  ]);
};
