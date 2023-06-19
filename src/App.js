import React, { useState } from "react";
import SearchPage from "./SearchPage";
import ListingPage from "./ListingPage";
// import DetailsPage from "./DetailsPage";
import "./App.css";

function App() {
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  });

  const handleGoBack = () => {
    setPokemonChosen(false);
    setPokemon({
      name: "",
      species: "",
      img: "",
      hp: "",
      attack: "",
      defense: "",
      type: ""
    });
  };

  const setSelectedPokemon = (selectedPokemon) => {
    setPokemon(selectedPokemon);
  };

  return (
    <div className="App">
      {!pokemonChosen && (
        <SearchPage setPokemonChosen={setPokemonChosen} setPokemon={setPokemon} />
      )}

      {pokemonChosen && (
        <div className="DisplaySection">
          <div className="PokemonCard">
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={pokemon.name} />
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h3>HP: {pokemon.hp}</h3>
            <h3>Attack: {pokemon.attack}</h3>
            <h3>Defense: {pokemon.defense}</h3>
          </div>

          <button onClick={handleGoBack} className="GoBackButton">Go Back</button>
        </div>
      )}

      {pokemonChosen && <hr />}

      <ListingPage setSelectedPokemon={setSelectedPokemon} />
    </div>
  );
}

export default App;
