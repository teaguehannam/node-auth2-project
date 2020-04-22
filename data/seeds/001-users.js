
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'Bob', password: 'saget'},
    {username: 'Lana', password: 'random1'},
    {username: 'Archer', password: 'sterling!'},
    {username: 'ShoeMan', password: 'goodPassword2014'}
  ]);
};