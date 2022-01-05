const Pokemon = require('../model/model');

async function getPokemons (req, res) {
  try {
    const pokemons = await Pokemon.find();
    res.send(pokemons);
    res.status(201);
  }
  catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

async function postPokemon (req, res) {
  try {
    const pokemon = req.body;
    const savedPoke = await Pokemon.create(pokemon);
    res.send(savedPoke);
    res.status(201);
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = { getPokemons, postPokemon }