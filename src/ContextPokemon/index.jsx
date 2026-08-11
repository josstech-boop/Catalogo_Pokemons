import { createContext, useEffect, useState } from "react";
import { ApiClient } from "../Utilis";
import { Placeholder } from "react-bootstrap";

const PokemonContext = createContext()

const PokemonProvider = ({ children }) => {

    const [favoritos, setFavoritos] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [paginados, setPaginados] = useState([])
    const [page, setPage] = useState(0)



    useEffect(() => {
        const getPoke = async () => {

            try {
                // const { data } = await ApiClient.get('/pokemon?limit=1025')
                const { data } = await ApiClient.get(`/pokemon?limit=20&offset=${page * 20}`)

                const pokemons = await Promise.all(data.results.map(async (item) => {
                    const pokemon = await ApiClient.get(item.url)
                    return {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        types: pokemon.data.types.map(item => item.type.name),
                        image: pokemon.data.sprites.other.home.front_default,
                        isFavorite: favoritos.some(item => item.id === pokemon.data.id)
                    }
                }))

                // paginate(pokemons)
                setPokemons(pokemons)
                setPokemonsFilter(pokemons)


            } catch (error) {
                console.log(error)
            }


        }

        // const paginate = (pokemons) => {
        //     const limit = 20
        //     let paginado = []


        //     for (let i = 0; i < pokemons.length; i += parseInt(limit)) {
        //         paginado.push(pokemons.slice(i, i + parseInt(limit)))
        //     }

        //     setPaginados(paginado)
        //     setPokemonsFilter(paginado[0])
        // }

        getPoke()

    }, [page])

    const getDetailPokemon = async (id) => {

        const pokemon = await ApiClient.get(`/pokemon/${id}`)
        return pokemon.data

    }


    const addFavorites = (id) => {
        const pokemon = pokemons.find(pokemon => pokemon.id == id)

        if (favoritos.every(item => item.id != pokemon.id)) {

            setPokemons((pokemons) => pokemons.map((pokemon) => (pokemon.id === Number(id) ? { ...pokemon, isFavorite: true } : pokemon)))

            setPokemonsFilter((pokemons) => pokemons.map((pokemon) => (pokemon.id === Number(id) ? { ...pokemon, isFavorite: true } : pokemon)))

            setFavoritos([...favoritos, {
                name: pokemon.name,
                image: pokemon.image,
                id: pokemon.id,
                types: pokemon.types
            }])
        }

    }




    return (
        <PokemonContext.Provider value={{
            getDetailPokemon,
            favoritos,
            addFavorites,
            pokemonsFilter,
            setPokemonsFilter,
            pokemons,
            paginados,
            setPaginados,
            setPage,
            page


        }}>
            {children}

        </PokemonContext.Provider>
    )
}

export { PokemonContext, PokemonProvider }