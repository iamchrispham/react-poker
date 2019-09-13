exports.seed = function(knex, Promise) {
  return knex('events').insert([
    {
      name: "Friday Sit & Go",
      description: "First come, First serve",
      location: "San Antonio",
      date: "October 30, 2018",
      start_time: '7:00 PM',
      end_time: ''
    },
    {
      name: "Sunday Night Football Freeroll",
      description: "Come watch the game Sunday with the boys",
      location: "San Antonio",
      date: "September 12, 2018",
      start_time: '7:00 PM',
      end_time: ''
    }
  ])
};


