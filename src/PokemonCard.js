import React from "react";

const PokemonCard = ({ pokemon, isFavorite, toggleFavorite }) => {
  const { name, img, type } = pokemon;

  return (
    <div className={`PokemonCard ${type}`}>
      <h1>{name}</h1>
      <img src={img} alt={name} />
      <h3>Type: {type}</h3>
      <button className="BookmarkIcon" onClick={() => toggleFavorite(name)}>
        {isFavorite ? "Unbookmark" : "Bookmark"}
      </button>
    </div>
  );
};
