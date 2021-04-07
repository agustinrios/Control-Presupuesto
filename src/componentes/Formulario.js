import  React, { Fragment, useState } from 'react';
import Error from './Error';
import  shortid  from 'shortid';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    //definir state
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //cuando el usuario agregue un gasto
    const agregarGasto = (e) => {
        e.preventDefault();
    

        //validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        
        
        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear el formulario
        guardarNombre('');
        guardarCantidad(0);

    }

    return(
        <Fragment>
            <form
              onSubmit={agregarGasto}
            >
                <h2>Agrega tus Gastos Aqui</h2>
                { error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" /> : null}
                <div className="campo">
                    <label>Nombre Gasto</label>
                    <input 
                        type="text"
                        className="u-full-width"
                        placeholder="Ej. Factura del telefono"
                        value={nombre}
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label>cantidad Gasto</label>
                    <input 
                        type="number"
                        className="u-full-width"
                        placeholder="500"
                        value={cantidad}
                        onChange={e => guardarCantidad( parseInt(e.target.value, 10) ) }
                    />
                </div>
                <input
                   type="submit"
                   className="button-primary u-full-width"
                   value="agregar gasto"
                />
            </form>
       </Fragment>
    );
}

export default Formulario;