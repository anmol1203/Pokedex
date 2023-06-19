import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

const DetailsPage = ({ pokemonId }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchPokemonDetails();
    const isPokemonBookmarked = localStorage.getItem(pokemonId);
    setIsBookmarked(!!isPokemonBookmarked);
  }, [pokemonId]);

  const fetchPokemonDetails = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Pokemon details:", error);
      });
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem(pokemonId);
      setIsBookmarked(false);
    } else {
      setIsBookmarked(true);
    }
  };

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div className="DetailsPage">
     <div className={`PokemonCard ${pokemon.type.name}`}>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>Species: {pokemon.species.name}</h3>
        <h3>Type: {pokemon.types[0].type.name}</h3>
        <h3>HP: {pokemon.stats[0].base_stat}</h3>
        <h3>Attack: {pokemon.stats[1].base_stat}</h3>
        <h3>Defense: {pokemon.stats[2].base_stat}</h3>
        <h3>Height: {pokemon.height}</h3>
        <h3>Weight: {pokemon.weight}</h3>
      </div>
      <div className="BookmarkButton" onClick={toggleBookmark}>
        {isBookmarked ? (
          <img src="/bookmark-filled.png" alt="Bookmark Filled" />
        ) : (
          <img src="/bookmark.png" alt="Bookmark" />
        )}
      </div>
    </div>
  );
};

export default DetailsPage;


