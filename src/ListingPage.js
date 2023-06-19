import React, { useState, useEffect } from "react";
import Axios from "axios";

const ListingPage = ({ setSelectedPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [previousUrl, setPreviousUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async (url = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0") => {
    try {
      const response = await Axios.get(url);
      const results = response.data.results;
      const pokemonData = await Promise.all(results.map(async (result) => {
        const pokemonResponse = await Axios.get(result.url);
        return extractPokemonData(pokemonResponse.data);
      }));
      setPokemonList(pokemonData);
      setPreviousUrl(response.data.previous);
      setNextUrl(response.data.next);
    } catch (error) {
      console.log("Failed to fetch the Pokemon list. Please try again.");
    }
  };

  const extractPokemonData = (data) => {
    return {
      name: data.name,
      species: data.species.name,
      img: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      type: data.types[0].type.name,
    };
  };

  const [expandedPokemon, setExpandedPokemon] = useState(null);

  const handleCardClick = (index) => {
    setSelectedPokemon(pokemonList[index]);
    if (expandedPokemon === index) {
      setExpandedPokemon(null);
    } else {
      setExpandedPokemon(index);
    }
  };

  const handlePreviousClick = () => {
    fetchPokemonList(previousUrl);
  };

  const handleNextClick = () => {
    fetchPokemonList(nextUrl);
  };

  return (
    <div className="DisplaySection">
      <div className="PokemonGrid">
        {pokemonList.map((pokemon, index) => (
          <div
            className={`PokemonCard ${expandedPokemon === index ? "Expanded" : ""}`}
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <h3>{pokemon.name}</h3>
            <img src={pokemon.img} alt={pokemon.name} />
            {expandedPokemon === index && (
              <>
                <p>Species: {pokemon.species}</p>
                <p>HP: {pokemon.hp}</p>
                <p>Attack: {pokemon.attack}</p>
                <p>Defense: {pokemon.defense}</p>
                <p>Type: {pokemon.type}</p>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="PaginationButtons">
        {previousUrl && (
          <button onClick={handlePreviousClick}>Previous</button>
        )}
        {nextUrl && (
          <button onClick={handleNextClick}>Next</button>
        )}
      </div>
    </div>
  );
};

export default ListingPage;

