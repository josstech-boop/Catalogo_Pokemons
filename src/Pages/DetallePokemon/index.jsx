import { useContext, useEffect, useState } from "react"

import { PokemonContext } from "../../ContextPokemon"
import { Container, Row, Col, Card, Badge, ListGroup, Spinner, Button, ProgressBar } from "react-bootstrap"
import "./DetallePokemon.css"
import { useNavigate, useParams } from "react-router"

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
                <Spinner animation="border" variant="info" style={{ width: '3rem', height: '3rem' }} />
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
            <Button className="btn-back-custom mb-4 shadow-sm" onClick={() => navigate(-1)}>
                ← Volver
            </Button>

            <Card className="detalle-pokemon-card border-0">
                <Row className="g-0">
                    {/* Columna Hero / Visual */}
                    <Col md={5} className="detalle-pokemon-hero">
                        <span className="pokemon-number-badge">#{paddedId}</span>

                        <div className="text-center my-3">
                            <Card.Title className="detalle-pokemon-title">{capitalizedName}</Card.Title>
                            <Card.Text className="detalle-pokemon-description mt-2">
                                Profiling completo: habilidades, movimientos y estadísticas base.
                            </Card.Text>
                        </div>

                        <div className="detalle-pokemon-image-wrap">
                            <img src={sprite} alt={capitalizedName} className="detalle-pokemon-image" />
                        </div>

                        <div className="pokemon-types mt-2 text-center">
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
                    </Col>

                    {/* Columna Detalles y Stats */}
                    <Col md={7}>
                        <Card.Body className="p-4 p-lg-5">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="text-muted text-capitalize mb-0">
                                    Categoría: <strong className="text-dark">{pokemon.species?.name || "Pokémon"}</strong>
                                </h5>
                            </div>

                            {/* Dimensiones */}
                            <div className="d-flex gap-3 mb-4">
                                <div className="dimension-card">
                                    <span>Altura</span>
                                    <strong>{pokemon?.height ? `${pokemon?.height / 10} m` : "—"}</strong>
                                </div>
                                <div className="dimension-card">
                                    <span>Peso</span>
                                    <strong>{pokemon?.weight ? `${pokemon?.weight / 10} kg` : "—"}</strong>
                                </div>
                            </div>

                            <Row className="mb-4 g-4">
                                <Col sm={6}>
                                    <h6 className="detalle-pokemon-section-title mb-3">Habilidades</h6>
                                    <div className="ability-list">
                                        {pokemon.abilities?.map((item) => (
                                            <Badge key={item.ability.name} className="badge-ability me-2 mb-2 text-capitalize">
                                                {item.ability.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </Col>

                                <Col sm={6}>
                                    <h6 className="detalle-pokemon-section-title mb-3">Movimientos Rápidos</h6>
                                    <ListGroup variant="flush" className="stat-list">
                                        {pokemon.moves?.slice(0, 4).map((move) => (
                                            <ListGroup.Item key={move.move.name} className="move-item px-3 py-2 border-0 text-capitalize">
                                                {move.move.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>

                            {/* Estadísticas */}
                            <div className="detalle-pokemon-stats pt-2">
                                <h6 className="detalle-pokemon-section-title mb-3">Estadísticas Base</h6>
                                {pokemon.stats?.map((stat) => (
                                    <div key={stat.stat.name} className="stat-row mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="stat-label-text text-capitalize">{stat.stat.name}</span>
                                            <span className="stat-value">{stat.base_stat}</span>
                                        </div>
                                        <ProgressBar
                                            now={Math.min(stat.base_stat, 100)}
                                            className="custom-progress"
                                        />
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