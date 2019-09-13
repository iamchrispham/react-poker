exports.up = function(knex, Promise) {
	return knex.schema.createTable('events', table => {
		table.increments('id');
		table.string('name');
		table.string('description');
		table.string('location');
		table.string('date');
		table.string('start_time');
		table.string('end_time');
		table.integer('host_id');
		table
			.foreign('host_id')
			.references('admins.id')
			.onDelete('CASCADE');
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('events');
};
