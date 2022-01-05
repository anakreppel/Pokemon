const { getPokemons, postPokemon } = require('./control/control');
const { Router } = require('express');

const router = new Router();

router.get('/pokemons', getPokemons);
router.post('/pokemons', postPokemon);

module.exports = router;

