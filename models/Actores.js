'use strict'


const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const actoresSchema = new Schema({
  nombre: {type: String, unique: true, required: true},
  nacionalidad: {type: String, required: true},
  principalPelicula: {type: [String], required: true},
});

const Actores = mongoose.model('Actores', actoresSchema);

module.exports = Actores; 
// image:{type: String}
