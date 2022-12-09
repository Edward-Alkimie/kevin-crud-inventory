/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('user_list', function (table) {
        table.increments('id');
        table.string('firstName', 255).notNullable();
        table.string('lastName', 255).notNullable();
        table.string('userName', 255).notNullable();
        table.string('password',255).notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("user_list");
  
};
