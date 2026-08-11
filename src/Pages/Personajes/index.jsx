import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { CardPokemon } from '../../Components/CardPokemon';
import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../../ContextPokemon';
import { NavLink } from 'react-router';
import '../PageShared.css';

const Personajes = () => {

    const { pokemonsFilter, setPokemonsFilter, pokemons, paginados, setPaginados, page, setPage } = useContext(PokemonContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // setPokemonsFilter(paginados[page])
        setPokemonsFilter(pokemons)

        const timer = setTimeout(() => {
            setLoading(false)
        }, 600)

        return () => clearTimeout(timer)
    }, [pokemons, setPokemonsFilter])

    const buscardor = (e) => {
        const pokemonsEncontrados = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(e.target.value)).slice(0, 20)

        if (e.target.value == '') {
            // setPokemonsFilter(paginados[page])
            setPokemonsFilter(pokemons)
        } else {
            setPokemonsFilter(pokemonsEncontrados)
        }
    }

    const irAdelante = () => {
        if (page <= 66) {
            setPage(prev => prev + 1)
            // setPokemonsFilter(paginados[page + 1])
            setPokemonsFilter(pokemons)
        }
    }

    const irAtras = () => {
        if (page > 0) {
            setPage(prev => prev - 1)
            // setPokemonsFilter(paginados[page - 1])
            setPokemonsFilter(pokemons)
        }
    }

    return (
        <Container fluid className="page-container">
            {/* Navbar flotante idéntico a la imagen */}
            <header className="pokedex-navbar">
                <span className="pokedex-logo">POKÉDEX</span>
                <nav className="pokedex-nav-links">
                    <NavLink to={'/'} className="pokedex-link">Inicio</NavLink>
                    <NavLink to={'/personajes'} className="pokedex-link">Catálogo</NavLink>
                    <NavLink to={'/favorites'} className="pokedex-link">Favoritos</NavLink>
                </nav>
            </header>

            {/* Banner principal morado/azul con badge amarillo */}
            <div className="home-card-header">
                <div>
                    <span className="home-badge">CATÁLOGO</span>
                    <h1 className="home-title">Explora tu colección de Pokémon</h1>
                    <p className="home-subtitle">Usa el buscador y navega tus personajes favoritos con una vista fresca y cómoda.</p>
                </div>
            </div>

            {/* Buscador y botones de paginación */}
            <div className="search-pagination-wrapper">
                <Form.Control
                    type="text"
                    placeholder="Buscar Pokémon..."
                    className="search-input"
                    onChange={buscardor}
                />

                <div className="pagination-buttons">
                    <button className="nav-btn" onClick={irAtras} disabled={page === 0}>
                        Atrás
                    </button>
                    <button className="nav-btn" onClick={irAdelante}>
                        Siguiente
                    </button>
                </div>
            </div>

            {/* Carga con Spinner */}
            {loading ? (
                <div className="loading-container">
                    <Spinner animation="border" role="status" className="custom-spinner" />
                    <p className="loading-text">Cargando catálogo...</p>
                </div>
            ) : (
                <Row xs={1} md={3} lg={4} xl={6} sm={2} className="g-4 mt-2">
                    {pokemonsFilter?.map((items, index) => (
                        <Col key={`${items.name}_${index}`} className="d-flex">
                            <div className="w-100 rounded-4 shadow-sm p-2 h-100" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}>
                                <CardPokemon {...items} />
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export { Personajes }