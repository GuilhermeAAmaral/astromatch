import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ContainerMatch = styled.div `
display: grid;
grid-template-columns: 1fr 1fr 1fr;
text-align: center;
justify-content: space-between;
align-items: center;
`

const Img = styled.img `
width: 80px;
height: 70px;
border-radius: 20px;
margin: 20px auto;
box-shadow: 0px 0px 3px 0px #555;
`

const CardMacth = styled.div `
align-items: center;
text-align: center;
justify-content: center;
`

const Text = styled.div `
font-size: bolder;
`

function TelaMacth(props) {

    const [listTela, setListTela] = useState ([])

    const getMatches = () => {

        axios.get ('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/matches')

        .then((res) => {
        setListTela (res.data.matches)
        })
        .catch((err) => {
        alert (err.data);
        });
    }

    useEffect(() => {

        getMatches()
    
      }, [props.clear])

      
    const ListaNaTela = listTela.map ((user) => {
        return <CardMacth key={user.id}>
            <Img src={user.photo}/>
            <strong><p>{user.name}</p></strong>
        </CardMacth>
    })
    
    return (

        <ContainerMatch>       
            {ListaNaTela}  
        </ContainerMatch>

    )
}

export default TelaMacth
