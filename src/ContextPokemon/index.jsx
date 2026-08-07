import { createContext } from "react";
import { ApiClient } from "../Utilis";

const PokemonContext = createContext()

const PokemonProvider = ({ children }) => {

    const getPokemons = async () => {

        const { data } = await ApiClient.get('/pokemon', { params: { limit: 30 } })

        const pokemons = await Promise.all(data.results.map(async (item) => {
            const pokemon = await ApiClient.get(item.url)
            return {
                name: pokemon.data.name,
                types: pokemon.data.types.map(item => item.type.name),
                image: pokemon.data.sprites.other.home.front_default
            }
        }))

        console.log(pokemons)

        // const pokemon = await ApiClient.get(response.data.results[0].url)
        // const pokemonMio = {
        //     name: pokemon.data.name,
        //     types: pokemon.data.types.map(item => item.type.name),
        //     image: pokemon.data.sprites.other.home.front_default
        // }
        // console.log(pokemonMio)

        // response.data.results[x].url
        return pokemons

    }

    return (
        <PokemonContext.Provider value={{
            getPokemons

        }}>
            {children}

        </PokemonContext.Provider>
    )
}

export { PokemonContext, PokemonProvider }