import React from "react"
import styled from "styled-components"

const ImagemCard = styled.img` 
width: 100%;
padding: -1rem;;
height: 200px;
min-height: 40vh;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
border-radius: 5px;

`

const CardDoProduto = styled.div ` 
display: flex;
flex-direction: column;
justify-content: center;
background-color: #D0D3D9;
text-align: center;
height: 24rem;
margin: auto;
border-radius: 5px;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0.2, 0.5);
`

const BotaoAdicionar = styled.button ` 
margin: 10px;
cursor: pointer;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
border-radius: 5px;
border:none;

`

const TextoProduto = styled.text ` 
margin: auto;
font-size: 1rem;


`

export default function CardProduto(props) {
  return (
    <CardDoProduto>
            <ImagemCard src={props.imageUrl}/>
            <TextoProduto>{props.name}</TextoProduto>
            <TextoProduto>R$ {props.valor}</TextoProduto>          
            <BotaoAdicionar onClick={() => props.adicionarCarrinho(props)}>Adicionar ao carrinho</BotaoAdicionar>
    </CardDoProduto>

  )
}