const db = require('./db.json');
const Pokemon = require('./model');

async function savePokes () {
  for (let i = 1; i < 151; i++) {
    new Pokemon({
      id: i,
      name: db[i - 1]["name"].charAt(0).toLocaleUpperCase() + db[i - 1]["name"].slice(1),
      front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + i + ".png",
      back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + i + ".png"
    }).save();
  }
}
savePokes();