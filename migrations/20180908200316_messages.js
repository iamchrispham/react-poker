exports.up = function(knex, Promise) {
	return knex.schema.createTable('messages', table => {
		table.increments('id');
		table.string('message');
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('messages');
};