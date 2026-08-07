import { BrowserRouter, Route, Routes } from "react-router"
import { Home } from "../Pages/Home"
import { Personajes } from "../Pages/Personajes"
import { Favoritos } from "../Pages/Favoritos"
import { PokemonProvider } from "../ContextPokemon"

function App() {

  return (
    <>

      <BrowserRouter>
        <PokemonProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favoritos />} />
            <Route path="/personajes" element={<Personajes />} />
          </Routes>

        </PokemonProvider>
      </BrowserRouter>

    </>
  )
}

export { App } 
