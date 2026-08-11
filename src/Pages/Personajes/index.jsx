import { Badge, Col, Container, Form, Row } from 'react-bootstrap';
import { CardPokemon } from '../../Components/CardPokemon';
import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../../ContextPokemon';
import { NavLink } from 'react-router';
import '../PageShared.css';

const Personajes = () => {

    const { pokemonsFilter, setPokemonsFilter, pokemons, paginados, setPaginados } = useContext(PokemonContext)
    const [page, setPage] = useState(0)
    // const [loading, setLoading] = useState(true)


    const buscardor = (e) => {
        const pokemonsEncontrados = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(e.target.value)).slice(0, 20)

        if (e.target.value == '') {
            setPokemonsFilter(paginados[page])
        } else {
            setPokemonsFilter(pokemonsEncontrados)
        }
    }

    const irAdelante = () => {
        setPage(prev => prev + 1)
        setPokemonsFilter(paginados[page + 1])
    }

    const irAtras = () => {
        page > 0 && setPage(prev => prev - 1)
        setPokemonsFilter(paginados[page - 1])
    }

    // useEffect(() => {
    //     console.log('cola')
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 3000);

    // }, [])

    return (

        <>

            <Container fluid className="page-container">
                <div className="page-header-box">
                    <div>
                        <span className="brand-badge">CATÁLOGO</span>
                        <h2 className="page-header-title">Explora tu colección de Pokémon</h2>
                        <p className="page-header-text">Usa el buscador y navega tus personajes favoritos con una vista fresca y cómoda.</p>
                    </div>
                    <div className="page-header-actions">
                        <div className="home-actions">
                            <NavLink to={'/'} className="home-btn">Inicio</NavLink>
                            <NavLink to={'/personajes'} className="home-btn">Catálogo</NavLink>
                            <NavLink to={'/favorites'} className="home-btn">Favoritos</NavLink>
                        </div>
                    </div>
                </div>

                <div className="search-row">
                    <Form.Control
                        type="text"
                        placeholder="Buscar Pokémon"
                        className="rounded-pill border-0 shadow-sm"
                        style={{ minWidth: '220px' }}
                        onChange={buscardor}
                    />

                    <div>
                        <button onClick={irAtras}>Atras</button>
                        <button onClick={irAdelante}>Siguiente</button>
                    </div>
                </div>

                <Row xs={1} md={2} lg={3} xl={4} className="g-4 mt-4">

                    {/*{loading &&
                        <div className="detalle-pokemon-loading">
                            <Spinner animation="border" role="status" />
                            <span>Cargando Pokémon...</span>
                        </div>} */}

                    {pokemonsFilter?.map((items, index) => (
                        <Col key={`${items.name}_${index}`} className="d-flex">
                            <div className="w-100 rounded-4 shadow-sm p-2 h-100" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}>
                                <CardPokemon {...items} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>


    )
}

export { Personajes } 