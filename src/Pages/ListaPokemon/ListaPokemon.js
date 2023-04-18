import { React, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Container, Btitulo, Titulo  } from "./ListaPokemonStyle";
import CartaPokemon from "../../Components/CartasPokemon/CartaPokemon";
function ListaPokemon() {
  const context = useContext(GlobalContext);
  const { pokemonsList } = context;

  return (
    <Container>
      <Btitulo>
        <Titulo>Todos Pokémons</Titulo>
      </Btitulo>
      {pokemonsList.map((pokemon) => {
        return <CartaPokemon key={pokemon.name} url={pokemon.url} />;
      })}
    </Container>
  );
}
export default ListaPokemon;