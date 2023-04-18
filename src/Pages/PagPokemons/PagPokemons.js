import React from "react";
import Header from "../../Components/Header/Header";
import { ContainerPokedex, CTituloPokedex, TitlePokedex } from "./PagPokemonsStyle";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import CartaPokemon from "../../Components/CartasPokemon/CartaPokemon";

function PokedexPage() {
  const context = useContext(GlobalContext);
  const { pokedex } = context;

  return (
    <>
      <Header />
          <CTituloPokedex>
            <TitlePokedex>
              Meus Pokémons
            </TitlePokedex>
          </CTituloPokedex>
      <ContainerPokedex>
      {pokedex
      .map((pokemon) => {
        return (
          <CartaPokemon
            key={pokemon.name}
            url={pokemon.url}
          />
        );
      })}
      </ContainerPokedex>
    </>
  );
}

export default PokedexPage;
