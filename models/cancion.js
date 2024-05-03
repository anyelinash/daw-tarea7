const mongoose = require('mongoose');

const cancionSchema = new mongoose.Schema({
  titulo: String,
  artista: String,
  genero: String,
  anio: Number
});

module.exports = mongoose.model('Cancion', cancionSchema);
