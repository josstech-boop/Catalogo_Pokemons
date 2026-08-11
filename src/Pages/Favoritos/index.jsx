import { useContext } from "react";
import { PokemonContext } from "../../ContextPokemon";
import { CardPokemon } from "../../Components/CardPokemon";
import '../PageShared.css';
import { NavLink } from "react-router";
import './favoritos.css';

const Favoritos = () => {

    const { favoritos } = useContext(PokemonContext)

    return (
        <div className="page-container">
            {/* Header / Navbar Flotante */}
            <header className="pokedex-navbar">
                <span className="pokedex-logo">POKÉDEX</span>
                <nav className="pokedex-nav-links">
                    <NavLink to={'/'} className={({ isActive }) => isActive ? "pokedex-link active" : "pokedex-link"}>
                        Inicio
                    </NavLink>
                    <NavLink to={'/personajes'} className={({ isActive }) => isActive ? "pokedex-link active" : "pokedex-link"}>
                        Catálogo
                    </NavLink>
                    <NavLink to={'/favorites'} className={({ isActive }) => isActive ? "pokedex-link active" : "pokedex-link"}>
                        Favoritos
                    </NavLink>
                </nav>
            </header>

            {/* Banner Tarjeta Principal */}
            <div className="home-card-header">
                <div>
                    <span className="home-badge">FAVORITOS</span>
                    <h1 className="home-title">Tu lista de Pokémon favoritos</h1>
                    <p className="home-subtitle">Aquí puedes revisar tus Pokémon guardados y gestionar tu colección personal.</p>
                </div>
            </div>

            {/* Lista de Favoritos o Estado Vacío */}
            {favoritos.length > 0 ? (
                <div className="favorites-grid">
                    {favoritos.map((pokemon) => (
                        <div key={`favorite_${pokemon.name}`} className="favorite-card-wrapper">
                            <CardPokemon {...pokemon} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="vacio-fav">
                    <div className="empty-icon-box">⭐</div>
                    <p className="vacio-title">Aún no tienes favoritos</p>
                    <p className="vacio-subtext">Explora el catálogo y añade tus Pokémon preferidos para verlos aquí.</p>
                    <NavLink to={'/personajes'} className="nav-btn-explore">
                        Ir al Catálogo
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export { Favoritos };