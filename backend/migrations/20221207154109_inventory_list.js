/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('inventory_list', function (table) {
        table.increments('id');
        table.integer('user_id');
        // table.foreign('user_id').references('user_list.id');
        table.string("itemName",255);
        table.string("description", 255);
        table.integer("quantity",10);
        table.foreign('user_id').references('user_list.id');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('inventory_list')

  
};
