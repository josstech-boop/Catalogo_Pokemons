import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { PokemonContext } from "../../ContextPokemon"
import { Container, Row, Col, Card, Badge, ListGroup, Spinner, Button, ProgressBar } from "react-bootstrap"
import "./DetallePokemon.css"

const DetallePokemon = () => {
    const { getDetailPokemon } = useContext(PokemonContext)
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    

    useEffect(() => {
        if (!id) return

        const getData = async () => {
            setLoading(true)
            try {
                const response = await getDetailPokemon(id)
                setPokemon(response)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [id, getDetailPokemon])

    if (loading) {
        return (
            <div className="detalle-pokemon-loading">
                <Spinner animation="border" role="status" />
                <span>Cargando Pokémon...</span>
            </div>
        )
    }

    if (!pokemon) {
        return <div className="detalle-pokemon-error">No se encontró el Pokémon.</div>
    }

    const capitalizedName = pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : ""
    const paddedId = pokemon.id?.toString().padStart(3, "0")
    const sprite =
        pokemon.sprites?.other?.home?.front_default ||
        pokemon.sprites?.other?.dream_world?.front_default ||
        pokemon.sprites?.front_default

    return (
        <Container className="detalle-pokemon-page py-5">
            <Button variant="light" className="mb-4 shadow-sm" onClick={() => navigate(-1)}>
                ← Volver
            </Button>

            <Card className="detalle-pokemon-card border-0 shadow-lg overflow-hidden">
                <Row className="g-0 align-items-center">

                    <Col md={5} className="detalle-pokemon-hero bg-gradient">
                        <Card.Title className="detalle-pokemon-title">{capitalizedName}</Card.Title>

                        <Card.Text className="detalle-pokemon-description text-secondary">
                            Explora el perfil completo de {capitalizedName}, incluyendo sus habilidades, movimientos rápidos y estadísticas clave.
                        </Card.Text>

                        <div className="detalle-pokemon-image-wrap">
                            <img src={sprite} alt={capitalizedName} className="detalle-pokemon-image" />
                        </div>
                        <div className="detalle-pokemon-meta text-center text-white px-4 pb-4">
                            <span className="pokemon-number">#{paddedId}</span>
                            <div className="pokemon-types mt-3">
                                {pokemon.types?.map((typeInfo) => {
                                    const typeName = typeInfo?.type?.name || typeInfo
                                    const keyValue = `${typeName}-${typeInfo?.slot ?? typeName}`
                                    const typeClass = `type-${String(typeName).toLowerCase().replace(/\s+/g, "-")}`
                                    return (
                                        <Badge key={keyValue} className={`type-badge text-capitalize me-2 mb-2 ${typeClass}`}>
                                            {typeName}
                                        </Badge>
                                    )
                                })}
                            </div>
                        </div>

                    </Col>

                    <Col md={7}>
                        <Card.Body className="px-5 py-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>

                                    <Card.Subtitle className="text-muted text-capitalize">
                                        {pokemon.species?.name || "Pokémon"}
                                    </Card.Subtitle>
                                </div>

                            </div>



                            <Row className="mb-4">
                                <Col md={6}>
                                    <h6 className="detalle-pokemon-section-title">Habilidades</h6>
                                    <div className="ability-list">
                                        {pokemon.abilities?.map((item) => (
                                            <Badge key={item.ability.name} bg="secondary" className="me-2 mb-2 text-capitalize">
                                                {item.ability.name}
                                            </Badge>
                                        ))}
                                    </div>

                                </Col>
                                <div className="pokemon-dimensions mt-3 mb-3 d-flex justify-content-center gap-2 flex-wrap">
                                    <div  >
                                        <span className="titulo-pa">Altura: </span>
                                        <strong>{pokemon?.height ? `${pokemon?.height / 10} m` : "—"}</strong>
                                    </div>
                                    <div >
                                        <span className="titulo-pa">Peso: </span>
                                        <strong>{pokemon?.weight ? `${pokemon?.weight / 10} kg` : "—"}</strong>
                                    </div>
                                </div>
                                <Col md={6}>
                                    <h6 className="detalle-pokemon-section-title">Movimientos rápidos</h6>
                                    <ListGroup variant="flush" className="stat-list">
                                        {pokemon.moves?.slice(0, 4).map((move) => (
                                            <ListGroup.Item key={move.move.name} className="px-0 py-2 border-0">
                                                {move.move.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>

                            <div className="detalle-pokemon-stats">
                                <h6 className="detalle-pokemon-section-title mb-3">Estadísticas</h6>
                                {pokemon.stats?.map((stat) => (
                                    <div key={stat.stat.name} className="stat-row mb-3">
                                        <div className="d-flex justify-content-between mb-1 stat-label">
                                            <span className="text-capitalize">{stat.stat.name}</span>
                                            <span>{stat.base_stat}</span>
                                        </div>
                                        <ProgressBar now={Math.min(stat.base_stat, 100)} label={`${stat.base_stat}`} />
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export { DetallePokemon } 