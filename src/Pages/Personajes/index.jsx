import { Badge, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { CardPokemon } from '../../Components/CardPokemon';
import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../../ContextPokemon';

const Personajes = () => {

    const { getPokemons } = useContext(PokemonContext)

    const [pokemons, setPokemons] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])


    useEffect(() => {
        const getPoke = async () => {
            let pokemonsApi = await getPokemons()

            setPokemons(pokemonsApi)
            setPokemonsFilter(pokemonsApi)


        }
        getPoke()
    }, [getPokemons])

    const buscardor = (e) => {
        const pokemonsEncontrados = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(e.target.value))
        setPokemonsFilter(pokemonsEncontrados)
    }

    return (
        <Container fluid className="py-4 px-3 px-md-5" style={{ background: 'linear-gradient(135deg, #e9fff8 0%, #eaf7ff 100%)', minHeight: '100vh' }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 rounded-4 p-3" style={{ background: 'linear-gradient(90deg, #1f9d8c 0%, #3a8dff 100%)', color: 'white' }}>
                <div>
                    <h2 className="fw-bold mb-1">Catálogo de Pokémon</h2>
                    <p className="mb-0" style={{ opacity: 0.9 }}>Explora tus personajes favoritos con una vista más elegante.</p>
                </div>
                <div className="d-flex flex-column flex-md-row align-items-stretch gap-2 mt-3 mt-md-0">
                    <div className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Buscar Pokémon"
                            className="rounded-pill border-0 shadow-sm"
                            style={{ minWidth: '220px' }}
                            onChange={buscardor}
                        />

                    </div>
                    <Badge bg="light" text="dark" pill className="fs-6 d-flex align-items-center justify-content-center">

                        {pokemons.length} Pokémon
                    </Badge>
                </div>
            </div>

            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {pokemonsFilter.map((items, index) => (
                    <Col key={`${items.name}_${index}`} className="d-flex">
                        <div className="w-100 rounded-4 shadow-sm p-2 h-100" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}>
                            <CardPokemon {...items} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export { Personajes } 