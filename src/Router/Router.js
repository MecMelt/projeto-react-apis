import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import PagPokemons from "../Pages/PagPokemons/PagPokemons"
import DetalhesPokemon from "../Pages/DetalhesPokemon/DetalhesPokemon";

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/pokedex" element={<PagPokemons/>}/>
            <Route path="/detailsPage/:id" element={<DetalhesPokemon/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router;