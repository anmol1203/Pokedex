import React, { useState } from "react";
import Axios from "axios";

const SearchPage = ({ setPokemonChosen, setPokemon }) => {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPokemon = () => {
    setLoading(true);
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setLoading(false);
        setError(null);
        setPokemon({
          name: response.data.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name
        });
        setPokemonChosen(true);
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to fetch the Pokemon. Please try again.");
      });
  };

  return (
    <div className="SearchPage">
      <div className="TitleSection">
        <h1>Pokedex</h1>
        <input
          type="text"
          value={pokemonName}
          onChange={(event) => setPokemonName(event.target.value)}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>

      <div className="DisplaySection">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <h1>Please choose a Pokemon</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
