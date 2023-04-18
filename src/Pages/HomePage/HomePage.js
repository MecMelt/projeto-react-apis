import React from "react";
import Header from "../../Components/Header/Header";
import ListaPokemon from "../ListaPokemon/ListaPokemon";
import { HomeContainer } from "./HomePageStyle";


function HomePage() {
  return (
    <HomeContainer>
    <Header />
    <ListaPokemon/>
    </HomeContainer>
  )
}

export default HomePage