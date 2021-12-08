import React from 'react'
import styled from 'styled-components'

const ContainerProfile = styled.div `
text-align: center;
width: 500px;
height: 350px;
margin: 25px auto;
`

const Img = styled.img `
width: 400px;
height: 300px;
border-radius: 30px;
box-shadow: 2px 2px 5px 0px #555;
`

const ContainerButtons = styled.div `
text-align: center;

button {
margin: 40px 40px auto;
width: 100px;
padding: 20px 30px;
border-radius: 20px;
border: 1px solid #FE4772;;
background-color: #FE4772;
color: white;
box-shadow: 0px 0px 3px 0px #555;
font-size: 25px;
cursor: pointer;
}

button:hover {
  background-color: red;
}
`

function TelaInicial (props) {
    
  return (

    <div>

      <ContainerProfile>
        <Img src={props.perfils.photo}/>
        <p><strong>{props.perfils.name}, {props.perfils.age}</strong></p> 
        <p>{props.perfils.bio}</p>
        </ContainerProfile>

      <ContainerButtons>
        <button onClick={props.choosePerson}>❤</button>
        <button onClick={props.choosePerson2}>✖</button>
      </ContainerButtons>
    
    </div>
  )
}

export default TelaInicial