## Initialized Knex

```
npm install knex pg express --save-dev
```

knex migrate:make users;
knex migrate:make admins;

knex seed:make users
knex seed:make admins

routes/api/index.js
