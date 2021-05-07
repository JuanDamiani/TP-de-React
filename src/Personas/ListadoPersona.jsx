import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
// falta Se tiene que poder ver los libros que tiene una persona prestados (es decir, los libros que le preste)
export default function ListadoPersona() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerPersonas = async() => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            if (e.message === 'Network error') {
                setError('No me pude conectar con el servidor');
            } else {
                setError('Otro mensaje que venga del server');
            }
            console.log(error);
        }
    }

    React.useEffect(() => {
        traerPersonas();
    }, [])

    const borrarPersona = async(idPersonaABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/persona/' + idPersonaABorrar.toString());
            traerPersonas();
        } catch(e) {
            console.log(e.message)

        }
    }


    return (
        <div>
            <Link to={"/personas/agregar"}>Agregar</Link>
            {error ? <>Error en la conexión</> : <></>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Alias</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map(unaPersona => (
                        <tr>
                            <td>{unaPersona.nombre}</td>
                            <td>{unaPersona.apellido}</td>
                            <td>{unaPersona.alias}</td>
                            <td>{unaPersona.email}</td>
                            <td>
                                <Link to={"/personas/editar/"+ unaPersona.id.toString()}>Editar</Link> |&nbsp;
                                <Link onClick={() => borrarPersona(unaPersona.id)}>Borrar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
                    }
