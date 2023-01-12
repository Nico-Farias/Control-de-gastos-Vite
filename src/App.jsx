import { useState, useEffect } from 'react';
import Header from "./components/Header"
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';





function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  )

  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])


  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)


  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltraados, setGastosFiltrados] = useState([])



  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)


      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'))

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }

  }, [])


  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      //filtrar por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }

  }, [filtro])


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }


  const guardarGasto = gasto => {
    if (gasto.id) {
      //Actualizar gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
      setGastoEditar({})

    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = new Date()
      setGastos([...gastos, gasto])

    }

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);

  }


  const eliminarGasto = (id) => {
    const gastosActualizado = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizado)

  }

  return (


    <div className={modal ? 'fijar' : ''}>

      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>

          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltraados}
            />

          </main>

          <div className='nuevo-gasto'>

            <img src={IconoNuevoGasto} alt="nuevoGasto" onClick={handleNuevoGasto} />

          </div>
        </>

      )}

      {modal && <Modal guardarGasto={guardarGasto} gastoEditar={gastoEditar} setModal={setModal} animarModal={animarModal} setGastoEditar={setGastoEditar} setAnimarModal={setAnimarModal} />}


    </div>

  )
}

export default App
