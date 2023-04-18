import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { goPagDetalhes } from "../../Router/coordinator";
import { coresPokemon } from "../../utils/CoresPokemon";
import { tiposPokemon } from "../../utils/TiposPokemon";
import { Pokeball, Card, Container, CaixaButton, ConteinerTipos } from "./CartaPokemonStyle";
import logoCartaPokemon from "../../assets/logo-pokemon-background.svg";

function CartaPokemon(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(GlobalContext);
  const { addPokemon, pokedex, removePokedex } = context;
  const [pokemon, setPokemon] = useState({});
  const [types, setTypes] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [pokemonOnPokedex, setPokemonOnPokedex] = useState(false);
  const { url } = props;

  useEffect(() => {
    fetchCartaPokemon();
  }, []);

  const showMod = () => {
    const mod = document.getElementById("mod");
    const title = document.getElementsByClassName("modTitle");
    const description = document.getElementsByClassName("modDescription");

    if (mod) {
      mod.style.display = "flex";
      document.body.style.overflow = "hidden";
      if (location.pathname === "/pokedex") {
        title[0].innerText = "Ah, não!";
        description[0].innerText = "Um Pokémon foi removido da sua Pokedéx";
      } else {
        title[0].innerText = "Gotcha!";
        description[0].innerText = "Um Pokémon foi adicionado a sua Pokédex";
      }
    }
  };

  const setPoketoDex = (pokemon) => {
    pokemon.url = url;
    addPokemon(pokemon);
    verificaEDefinePokemon(pokemon);
    showMod();
  };

  const removePokemon = (pokemon) => {
    removePokedex(pokemon.id);
    console.log(pokedex, "card")
    showMod();
  };

  const verificaEDefinePokemon = (pokemon) => {
    const isAlreadyOnPokedex = pokedex.find(
      (pokemonNoPokedex) => pokemonNoPokedex.name === pokemon.name
    );
    if (isAlreadyOnPokedex) {
      setPokemonOnPokedex(true);
    }
  };

  const fetchCartaPokemon = async () => {
    console.log(url);
    await axios
      .get(url)
      .then((response) => { setPokemon(response.data); setBgColor(coresPokemon(response.data.types[0].type.name)); setTypes(response.data.types); verificaEDefinePokemon(response.data);})
      .catch((error) => {
        console.log("Erro ao buscar lista de pokemons", error);
      });
  };

  return (
    <Card style={{ backgroundColor: bgColor }}>
      <Container>
        <p className="idPokemon">#0{pokemon.id}</p>
        <p className="name">{pokemon.name}</p>
        <ConteinerTipos>
          {types.map((type) => {
            return (
              <img className="imgTypePokemon" key={type.type.name} src={tiposPokemon(type.type.name)} alt={type.type.name}/>
            );
          })}
        </ConteinerTipos>
      </Container>
      <img
        className="imgPokemon"
        src={pokemon.sprites?.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <CaixaButton>
        <Button fontSize={"18"} as={"u"} left={"10px"} fontWeight="bold" border={"hidden"} fontFamily={"Poppins"} cursor={"pointer"} onClick={() => goPagDetalhes(navigate, pokemon.id)}>
          Detalhes
        </Button>

        {location.pathname === "/pokedex" ? (
          <Button cursor={"pointer"} fontStyle={"400"} fontSize={"16"} lineHeight={"24"} color={"white"} w="146px" h="38px" right={"15px"} border={"hidden"} borderRadius={8} backgroundColor="#FF6262" fontFamily={"Poppins"} onClick={() => removePokemon(pokemon)}>
            Excluir
          </Button>
        ) : pokemonOnPokedex ? (
          <Button fontStyle={"400"} fontSize={"16"} lineHeight={"24"} color={"#0F0F0F"} w="146px" h="38px" right={"15px"} border={"hidden"} borderRadius={8} colorScheme="white" fontFamily={"Poppins"}>
            Já capturado!
          </Button>
        ) : (
          <Button cursor={"pointer"} fontStyle={"400"} fontSize={"16"} lineHeight={"24"} color={"#0F0F0F"} w="146px" h="38px" right={"15px"} border={"hidden"} borderRadius={8} colorScheme="white" fontFamily={"Poppins"} onClick={() => setPoketoDex(pokemon)}>
            Capturar!
          </Button>
        )}
      </CaixaButton>
      <Pokeball>
        <img
          className="logoCartaPokemon"
          src={logoCartaPokemon}
          alt="logo do Pokémon"
        />
      </Pokeball>
    </Card>
  );
}

export default CartaPokemon;
