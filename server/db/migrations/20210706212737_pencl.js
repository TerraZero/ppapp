const Core = require('pencl-core');

Core().booting(__dirname);

const Knex = require('pencl-knex')();

exports.up = function(knex) {
  return Knex.schemas.dbCreate(knex);
};

exports.down = function(knex) {
  return Knex.schemas.dbDrop(knex);
};

