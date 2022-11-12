import React, { useState } from 'react';
import "./App.css";
import axios from 'axios';


function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defence: "",
    type: "",
  });

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon({
          name: pokemonName,
          img: response.data.sprites.other.dream_world.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defence: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      });
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark Header">
        <div className="container-fluid">
          <h1 className="navbar-brand fs-3">Pokemon Stats</h1>
          <div className='d-flex'>
            <input className="input-box" type="text" onChange={(event) => { setPokemonName(event.target.value); }} placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" onClick={searchPokemon}><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-center m-5">
        <div className="card glass d-flex text-center" >
          {!pokemonChosen ? (<h3 className='text-warning p-3'>To get stats of your desired pokemon, search name of the pokemon in the search box.</h3>) : (
            <><img src={pokemon.img} className="card-img-top p-3 poke-img" alt="pokemon-img" /><div className="card-body">
              <h4 className="card-title text-capitalize font-monospace">{pokemon.name}</h4>
            </div><ul className="list-group list-group-flush">
                <li className="list-group-item font-monospace">Type: {pokemon.type}</li>
                <li className="list-group-item font-monospace">HP: {pokemon.hp}</li>
                <li className="list-group-item font-monospace">Attack: {pokemon.attack}</li>
                <li className="list-group-item font-monospace">Defence: {pokemon.defence}</li>
              </ul></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

