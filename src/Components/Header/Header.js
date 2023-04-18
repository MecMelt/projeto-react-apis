import { React, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { goHomePage, goPokedexPage } from "../../Router/coordinator";
import { Button } from "@chakra-ui/react";
import { HeaderConteiner } from "./HeaderStyle";
import logoPokemon from "../../assets/pokemon-logo.svg";

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const context = useContext(GlobalContext);
  const [pokemonOnPokedex, setPokemonOnPokedex] = useState(false);
  const { addPokemon, pokedex, removePokedex, detalhesPokemon} = context;

  useEffect(() => {
    checkPokemonOnPokedex()
  }, []);

  const checkPokemonOnPokedex = (detalhesPokemon) => {
    const prontoNoPokedex = pokedex.find(
      (pokemonNoPokedex) => pokemonNoPokedex.id === Number(params.id)
    );
    if (prontoNoPokedex) {
      setPokemonOnPokedex(true);
    }
  };

  const showMod = (excluir) => {
    const mod = document.getElementById("mod");
    const title = document.getElementsByClassName("modTitle");
    const description = document.getElementsByClassName("modDescription");

    if (mod) {
      mod.style.display = "flex";
      document.body.style.overflow = "hidden";

      console.log(excluir)

      if (excluir) {
        title[0].innerText = "Ah, não!";
        description[0].innerText = "Um Pokémon foi removido da sua Pokedéx";
      } else {
        title[0].innerText = "Gotcha!";
        description[0].innerText = "Um Pokémon foi adicionado a sua Pokédex";
      }
    }
  };

  const setPoketoDex = () => {
    const copyPokemon = detalhesPokemon
    copyPokemon.url = `https://pokeapi.co/api/v2/pokemon/${params.id}/`;
    console.log(copyPokemon)
    addPokemon(copyPokemon);
    checkPokemonOnPokedex(copyPokemon);
    showMod();
  };

  const removePokemon = () => {
    removePokedex(params.id);
    showMod(true);
    setPokemonOnPokedex(false)
  };

  function render() {
    if (location.pathname === "/") {
      return (
        <>
          <img style={{ position: "absolute", left: "50%", transform: "translateX(-50%)",}} src={logoPokemon} alt="Logo Do Pokémon"/>
          <Button onClick={() => goPokedexPage(navigate)} backgroundColor="#33A4F5" w="167px" h="45px" borderRadius={5} fontFamily={"Poppins"} border={"hidden"} cursor={"pointer"} color="#ffffff" fontWeight="bold" left={"87%"}>
            Pokédex
          </Button>
        </>
      );
    } else if (location.pathname === "/pokedex") {
      return (
        <>
          <Button left={"2%"} fontSize={"18"} as={"u"} fontWeight="bold" border={"hidden"} fontFamily={"Poppins"} backgroundColor="white" cursor={"pointer"} onClick={() => goHomePage(navigate)}>
            {"< "}Todos os Pokémons
          </Button>
          <img
            style={{ position: "absolute", left: "50%", transform: "translateX(-50%)"}}
            src={logoPokemon}
            alt="Logo Do Pokémon"
          />
        </>
      );
    } else if (location.pathname === `/detailsPage/${params.id}`) {
      return (
        <>
          <Button fontSize={"18"} as={"u"} fontWeight="bold" border={"hidden"} fontFamily={"Poppins"} backgroundColor="white" cursor={"pointer"} onClick={() => goHomePage(navigate)}>
            {"< "}Todos os Pokémons
          </Button>
          <img src={logoPokemon} alt="Logo Do Pokémon" />
          {
            pokemonOnPokedex ? (
              <Button onClick={() => removePokemon()} backgroundColor="#FF6262" w="167px" h="45px" borderRadius={5} fontFamily={"Poppins"} border={"hidden"} cursor={"pointer"} color="#ffffff" fontWeight="bold">
              Remover da Pokédex
            </Button>
            ) : (
              <Button cursor={"pointer"} fontStyle={"400"} fontSize={"16"} lineHeight={"24"} color={"#0F0F0F"} w="146px" h="38px" right={"15px"} border={"hidden"} borderRadius={8} colorScheme="white" fontFamily={"Poppins"} onClick={() => setPoketoDex()}>
              Capturar!
            </Button>
            )
          }
        </>
      );
    }
  }
  return <HeaderConteiner>{render()}</HeaderConteiner>;
}
export default Header;
