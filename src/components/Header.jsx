import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlDePresupuesto from './ControlDePresupuesto'


const Header = ({ presupuesto, setGastos, gastos, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto }) => {

    return (
        <header>

            <h1>PLANIFICADOR DE GASTOS</h1>

            {isValidPresupuesto ? (
                <ControlDePresupuesto
                    presupuesto={presupuesto}
                    gastos={gastos}
                    setGastos={setGastos}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}

                />) :
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            }



        </header>

    )
}

export default Header