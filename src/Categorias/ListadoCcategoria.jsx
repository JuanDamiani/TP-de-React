import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function ListadoCategoria() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerCategoria = async() => {
        try {
            const respuesta = await axios.get('localhost:3000/api/categoria');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            if (e.message=='Network error') {
                setError('No me pude conectar con el servidor');
            } else {
                setError('Otro mensaje que venga del server');
            }
        }
    }

    React.useEffect(() => {
        traerCategoria();
    }, [])

    const borrarCategoria = async(idPersonaABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/categoria/' + idPersonaABorrar)
            traerPersonas();
        } catch(e) {

        }
    }


    return (
        <div>
            <Link to={"/categoria/agregar"}>Agregar</Link>
            {error ? <>Error en la conexión</> : <></>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map(unaCategoria => (
                        <tr>
                            <td>{unaCategoria.nombre}</td>
                            <td>
                                <Link to={"/categoria/editar/"+unaPersona.id.toString()}>Editar</Link> |&nbsp;
                                <Link onClick={() => borrarPersona(unaPersona.id)}>Borrar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
