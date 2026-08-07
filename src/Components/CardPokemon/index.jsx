import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardPokemon.css';

const CardPokemon = ({ name, image, types }) => {

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
                        <Button variant="primary" className="w-100">Ver detalles</Button>
                        <Button variant="secondary" className="w-100">Agregar a Favoritos</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export { CardPokemon } 