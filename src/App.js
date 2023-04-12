import { React, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "./contexts/GlobalContext";
import Router from "../src/Router/Router";
import { createGlobalStyle } from "styled-components";
import ModPokemon from "./Components/ModPokemon/ModPokemon";


const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #5d5d5d;
  }`;

function App() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [detalhesPokemon, setdetalhesPokemon] = useState({});

  useEffect(() => {
    pokeList();
  }, []);

  const pokeList = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        setPokemonsList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPokemon = (pokemon) => {
    const pokedexCopy = pokedex

    const prontoNoPokedex = pokedex.find(
      (pokemonNoPokedex) => pokemonNoPokedex.name === pokemon.name
    );

    if (!prontoNoPokedex) {
      pokedexCopy.push(pokemon)
      setPokedex(pokedexCopy);
    }
  };

  const removePokedex = (pokemonToRemove) => {
    const newPokedex = pokedex.filter(
      (pokemonNoPokedex) => pokemonNoPokedex.id !== Number(pokemonToRemove)
    );

    console.log(newPokedex, "copy")
    setPokedex(newPokedex);
  };

  
  const context = {
    pokemonsList,
    setPokemonsList,
    pokeList,
    pokedex,
    setPokedex,
    addPokemon,
    removePokedex,
    detalhesPokemon,
    setdetalhesPokemon

  };

  return (
    <>
      <GlobalContext.Provider value={context}>
        <ModPokemon/>
        <Router />
        <GlobalStyled />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
