import { NavLink } from "react-router"
import "./Home.css"

const Home = () => {
    return (
        <main className="home-page">
            {/* Header de navegación integrado */}
            <header className="home-navbar">
                <div className="navbar-brand">
                    <span className="brand-logo">POKÉDEX</span>
                </div>
                <nav className="home-actions">
                    <NavLink to={'/'} className="home-btn">Inicio</NavLink>
                    <NavLink to={'/personajes'} className="home-btn">Catálogo</NavLink>
                    <NavLink to={'/favorites'} className="home-btn">Favoritos</NavLink>
                </nav>
            </header>

            <section className="home-header">
                <div className="home-brand">
                    <span className="brand-badge">BIENVENIDO</span>
                    <h1 className="home-title">Explora tu aventura Pokémon</h1>
                    <p className="home-subtitle">
                        Descubre personajes, colecciona tus favoritos y sumérgete en un universo lleno de color y energía.
                    </p>
                </div>
            </section>

            <section className="home-hero">
                <div className="hero-copy">
                    <h2>Tu portal de Pokémon está listo</h2>
                    <p>
                        En esta pantalla encontrarás un diseño limpio con botones directos, un fondo de figuras inspirado en el mundo Pokémon y una bienvenida cálida para el usuario.
                    </p>
                    <div className="hero-cards">
                        <div className="hero-card card-verde">
                            <h3>Catálogo interactivo</h3>
                            <p>Revisa todos los personajes disponibles y navega fácilmente entre ellos.</p>
                        </div>
                        <div className="hero-card card-amarillo">
                            <h3>Favoritos rápidos</h3>
                            <p>Guarda los Pokémon que más te gusten y vuelve a ellos en un click.</p>
                        </div>
                        <div className="hero-card card-rosado">
                            <h3>Diseño vibrante</h3>
                            <p>Usamos una paleta alegre con tonos celeste, morado, rosado, verde y amarillo para una experiencia visual única.</p>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    {/* <div className="visual-shape"></div>
                    <div className="visual-shape"></div>
                    <div className="visual-shape"></div>
                    <div className="visual-shape"></div>
                    <div className="visual-pokeball"></div> */}
                </div>
            </section>

            <footer className="home-footer">Bienvenido, entrenador. ¡Tu pokédex te espera!</footer>
        </main>
    )
}

export { Home }