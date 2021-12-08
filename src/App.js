import React, { useEffect, useState } from 'react'
import TelaInicial from './componentes/TelaInicial';
import TelaMacth from './componentes/TelaMacth';
import styled from 'styled-components'
import axios from 'axios';

const ContainerApp = styled.div `
background-color: white;
text-align: center;
border: 1px solid black;
border-radius: 15px;
width: 650px;
height: 610px;
margin: 20px auto;
`

const ContainerHeader = styled.div `
border-radius: 15px 15px 0px 0px;
background-color: #FE4772;
display: flex;
justify-content: space-around;
text-align: center;
text-align: center;
align-items: center;
color: white;
font-size: 18px;
`
const Buttonss = styled.button `
margin: 10px;
border: solid 1px #FE4772;
background-color: #FE4772;
color: white;
border-bottom: 2px solid white;
cursor: pointer;
font-size: 17px;
`

function App () {

  const [tela, setTela] = useState ('TelaMatch')
  const [perfils, setPerfils] = useState ('')
  const [listaMatch, setListaMatch] = useState ({})

  const escolheTela = () => {

    switch (tela) {

      case "TelaInicial":
        return <TelaMacth listaMatch={listaMatch} clear={clear}/>
      case "TelaMatch":
        return <TelaInicial perfils={perfils} choosePerson={choosePerson} choosePerson2={choosePerson2}/>
      default:
        return <div>Erro! Página não encontrada :( </div>    
    }
  }

  const irParaTelaMatch = () => {
    setTela ('TelaInicial')
  }

  const irParaTelaInicial = () => {
    setTela ('TelaMatch')
  }
  
  const getProfileToChoose = () => {

    axios.get ('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/person')

    .then((res) => {
      setPerfils (res.data.profile)
    })
    .catch((err) => {
      alert (err.data)
    });
  }

  useEffect(() => {

    getProfileToChoose()

  }, [])

  const body = {
    id: perfils.id,
    choice: true
  }

  const choosePerson = () => {

    axios.post ('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/choose-person', body, {

        headres: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
    
    .then((res) => {
      setListaMatch (res.data.matches)
      getProfileToChoose()
    })
    .catch((err) => {
      alert (err.data)
    });
  }

  const body2 = {
    id: perfils.id,
    choice: false
  }

  const choosePerson2 = () => {

    axios.post ('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/choose-person', body2, {

        headres: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
    
    .then((res) => {
      setListaMatch (res.data.matches)
      getProfileToChoose()
     
    })
    .catch((err) => {
      alert (err.data)
    });
  }

  const clear = () => {

    axios.put ('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/clear') 


    .then((res) => {
    setListaMatch (res.data)
    })

    .catch((err) => {
      alert (err.data);
    })
    
  }

  return (

    <ContainerApp>

      <ContainerHeader>
        <h3>Astromatch</h3>
        <Buttonss onClick={irParaTelaInicial}>Home</Buttonss>
        <Buttonss onClick={irParaTelaMatch}>Macths</Buttonss>
        <Buttonss onClick={clear}>Reset</Buttonss>
      </ContainerHeader>

      {escolheTela()}

    </ContainerApp>
  )
}

export default App;