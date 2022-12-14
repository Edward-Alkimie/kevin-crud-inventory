/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory_list').del()
  await knex('inventory_list').insert([
    { user_id: 1, itemName: "ipod", description:"device to play music", quantity:10},
    { user_id: 2, itemName: "ipad", description:"device to read information", quantity:70},
    { user_id: 1, itemName: "kindle", description:"device to read books", quantity:1000},
    { user_id: 2, itemName: "linux", description:"device to mess around", quantity:7099},
    { user_id: 1, itemName: "camera", description:"device to take pic", quantity:20}
  ]);
};
