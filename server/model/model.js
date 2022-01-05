const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/';

try {
  mongoose.connect(url);
  console.log('mongodb conected');
} catch (e) {
  console.log(e);
}

const pokemonsSchema = mongoose.Schema({
  id: Number,
  name: String,
  front: String,
  back: String
})

const Pokemon = mongoose.model('Pokemon', pokemonsSchema);


module.exports = Pokemon;

