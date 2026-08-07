import { NavLink } from "react-router"

const Home = () => {
    return (
        <>
            <p>Bienvenido a Pantalla Principal</p>



            <NavLink to={'/'} className={'btn btn-primary'} > Ir a catalogo </NavLink>
            <NavLink to={'/favorites'} className={'btn btn-primary'}>Ver mis favoritos</NavLink>
            <NavLink to={'/personajes'} className={'btn btn-primary'}>Ver Personajes</NavLink>



        </>
    )
}

export { Home } 