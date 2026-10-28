import { BrowserRouter, Route, Routes } from "react-router"
import { Home } from "../Pages/Home"
import { Personajes } from "../Pages/Personajes"
import { Favoritos } from "../Pages/Favoritos"
import { PokemonProvider } from "../ContextPokemon"
import { DetallePokemon } from "../Pages/DetallePokemon"

function App() {

  return (
    <>

      <BrowserRouter basename="/Catalogo_Pokemons">
        <PokemonProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favoritos />} />
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/detalle/:id" element={<DetallePokemon />} />
          </Routes>

        </PokemonProvider>
      </BrowserRouter>

    </>
  )
}

export { App } 
