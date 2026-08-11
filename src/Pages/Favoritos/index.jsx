import { useContext } from "react";
import { PokemonContext } from "../../ContextPokemon";
import { CardPokemon } from "../../Components/CardPokemon";
import '../PageShared.css';
import { NavLink } from "react-router";
import './favoritos.css'

const Favoritos = () => {

    const { favoritos } = useContext(PokemonContext)

    return (
        <div className="page-container">
            <div className="page-header-box">
                <div>
                    <span className="brand-badge">FAVORITOS</span>
                    <h2 className="page-header-title">Tu lista de Pokémon favoritos</h2>
                    <p className="page-header-text">Aquí puedes revisar tus Pokémon guardados y avanzar por la colección usando los botones de paginación.</p>
                </div>
                <div className="page-header-actions pagination-actions">
                    <div className="home-actions">
                        <NavLink to={'/'} className="home-btn">Inicio</NavLink>
                        <NavLink to={'/personajes'} className="home-btn">Catálogo</NavLink>
                        <NavLink to={'/favorites'} className="home-btn">Favoritos</NavLink>
                    </div>
                </div>
            </div>

            {favoritos.length > 0 ?
                <div className="favorites-grid">
                    {favoritos.map((pokemon) => (
                        <CardPokemon key={`favorite ${pokemon.name}`} {...pokemon} />
                    ))}
                </div>
            
                : <div className="vacio-fav"><p>No hay pokemons favoritos</p></div> }
        </div>
    );
}

export { Favoritos };