import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardPokemon.css';
import { Link, NavLink } from 'react-router';
import { useContext, useState } from 'react';
import { PokemonContext } from '../../ContextPokemon';

const CardPokemon = ({ name, image, types, id, isFavorite }) => {

    const [favorito, setFavorito] = useState(isFavorite)

    const { addFavorites } = useContext(PokemonContext)

    return (
        <>
            <Card className="card-pokemon">
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {types.join(' / ')}
                    </Card.Text>
                    <div className="d-flex flex-column flex-sm-row gap-2 mt-3">


                        <NavLink to={`/detalle/${id}`} >
                            <Button variant="primary" className="w-100"
                            >  Ver detalles</Button>
                        </NavLink>

                        {isFavorite != undefined && <Button onClick={() => {
                            addFavorites(id)
                            setFavorito(!favorito)
                        }} variant={`${isFavorite ? 'danger' : 'secondary'}`} className={`w-100 `} >Agregar a Favoritos</Button>}


                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export { CardPokemon } 