exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', table => {
		table.increments('id');
		table.string('email');
    table.string('hashed_pw');
		table.string('phone');
    table.integer('balanceHours');
		table.integer('qualifierHours');
		table.string('access');
		table.boolean('checkedIn');
    table.string('name');
		table.string('username');
		table.string('nickname');
		table.string('picture');
		table.string('user_id');
		table.string('password');
		table.boolean('email_verified');
		table.string('given_name');
		table.string('family_name');
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');
};

