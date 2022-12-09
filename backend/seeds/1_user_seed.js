/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory_list').del()
  await knex('user_list').del()
  await knex('user_list').insert([
    { firstName: 'John', lastName: "wick", userName:"johnwick", password:"123456"},
    { firstName: 'John1', lastName: "wick1", userName:"johnwick1", password:"123456"},
    { firstName: 'Matthew', lastName: "Wegenke", userName:"johnwick1", password:"123456"},
    { firstName: 'Caroline', lastName: "Verticchio", userName:"carolineverticchio", password:"123456"},
    { firstName: 'George', lastName: "Mihov", userName:"georgemihov", password:"123456"}

  ]);
};
