
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users.string('username', 64)
            .notNullable()
            .unique();
        users.string('password', 32)
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};