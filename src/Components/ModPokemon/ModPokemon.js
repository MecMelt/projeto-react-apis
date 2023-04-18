import React from "react";
import { Container, Mod } from "./ModPokemonStyle";

function ModPokemon() {
  const closeMod = (event) => {
    if(event.currentTarget.id === event.target.id) {
      document.body.style.overflow = "initial";
      const mod = document.getElementById("mod")
      mod.style.display = "none";
    }
  }
  return (
    <>
      <Container id="mod" onClick={closeMod}>
        <Mod>
          <h2 className="modTitle">
            Gotcha!
          </h2>
          <p className="modDescription">
            Um Pokémon foi adicionado a sua Pokédex
          </p>
        </Mod>
      </Container>
    </>
  );
}
export default ModPokemon;
