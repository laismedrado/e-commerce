import React from "react";
import styled from "styled-components";
import CardProduto from "./Components/CardProduto";
import { listaDeProdutos } from "./Components/ListaDeProdutos";
import CarrinhoDeCompras from "./assets/shopping-cart.svg";
import lixeira from "./assets/iconeLixeira.svg"

//============================ Estilização ============================
const BarraInformacoes = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;  
  font-size: 1.25em;
`;
const ContainerHome = styled.div`
  /* height:100vh; */
  
  width: 90%;
  margin: auto;
`;
const ContainerProdutos = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  row-gap: 10px;
  column-gap: 10px;
  margin: 10px;
`;
const ContainerFiltros = styled.div` 
display: flex;
flex-direction: column;
padding: 1rem;
width: 250px;
`
const Container = styled.div` 
width: 100%;
display: grid;
grid-template-columns: .1fr 2fr 1fr;

`
const CampoOrdenacao = styled.div` 
display: flex;
justify-content: space-between;
width: 45%;
margin-left: 4.5rem;
`
const CampoInput = styled.div` 
display: flex;
flex-direction: column;
height: 90px;
justify-content: space-around;
margin: 30px;
margin-top: .4rem;
font-size: 1.25em;

`
const Input = styled.input` 
padding: 10px;
border-radius: 5px;
border: red;
margin-top: 10px;
background-color: #D0D3D9;
color: black;
`
const ContainerCarrinho = styled.div` 
display: flex;
justify-self: flex-end;
flex-direction: column;
width: 370px;
height: 100vh;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
position:fixed;
`
const ContainerItemCarrinho = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: .7rem;
  border:20px;
  align-items: center;
  padding: 0 1rem;
  height: 80px;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  width: 337px;
`
const ContainerTodosProdutos = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  overflow-y: auto;
`
const ContainerValorTotal = styled.div`
  display: flex;
  justify-content: space-between;
 height: 3rem;
   font-size: 1.2rem;
   background-color: #d0d3d9;
  padding: 0 .5rem;
  font-weight: 1000;
`
const ContainerHeaderCarrinho = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #d0d3d9;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const ContainerPrecoItem = styled.p`
  font-weight: bold;
  text-align: justify;
  padding-right: 0.5rem;
  width:30%;
`
const ContainerDescricaoItem = styled.p`
  display:flex;
  width: 55%;
  text-align: left;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`
const ContainerImgProdCarrinho = styled.div`
  width:15%;
`
const ImgProdCarrinho = styled.img`
  height: 50px;
`
const TitleContainerFiltro = styled.text`
margin-left: 2rem;
margin-top: .25rem;
background-color: #CAC9C4;
font-size: 1.5rem;
`
const ContainerDescItemCarrinho = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`
const BotaoLimparCarrinho = styled.button`
  background-color: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  height: 50px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  :hover {
  background-color: red;
}
`
const BotaoFinalizarCompra = styled.button`
  background-color: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  height: 50px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  :hover {
  background-color: green;
}
`


const BotaoDeleteItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
class App extends React.Component {
  state = {
    produtos: listaDeProdutos,
    query: "",
    precoMinimo: "",
    precoMaximo: "",
    classificacaoCategoria: "",
    order: 1,
    sortingParamater: "name",
    carrinho: [],
  };

  // componentDidMount(){
  //   this.pegarProdutosAdicionados();
  // }

  // Adicionar item ao carrinho
  adicionarCarrinho = (produto) => {

    const produtosDoCarrinho = [...this.state.carrinho]
    let novoProduto = {...produto}

    const contem = produtosDoCarrinho.findIndex(item=> item.name === produto.name)
    
    if(contem >= 0){
      novoProduto = produtosDoCarrinho[contem]
      novoProduto.quantidade++
      produtosDoCarrinho[contem] = novoProduto
    }else{
      novoProduto.quantidade = 1
      produtosDoCarrinho.push(novoProduto)
    }

    // localStorage.setItem("produtosAdicionados", JSON.stringify(produtosDoCarrinho))

    this.setState({ carrinho: produtosDoCarrinho })
  }

  // Remover cada item do carrinho
  removeItem = (name) => {
    const listaFiltrada = this.state.carrinho.filter((produto) => produto.name !== name);

    // localStorage.setItem("produtosAdicionados", JSON.stringify(listaFiltrada))

    this.setState({carrinho: listaFiltrada });
  };

  // Remover todos os itens do carrinho
  limparCarrinho = () =>{
    const novaListaDeprodutos = this.state.carrinho.filter((produto)=>{
      return produto === produto.id 
    })
    // localStorage.setItem("produtosAdicionados", JSON.stringify(novaListaDeprodutos))

    this.setState({carrinho: novaListaDeprodutos})
  }

  // pegarProdutosAdicionados = () =>{
  //   const produtosAdicionados = JSON.parse(localStorage.getItem("produtosAdicionados"))
  //   this.setState({carrinho: produtosAdicionados})
  // }

  upDateQuery = (event) => {
    this.setState({ query: event.target.value });
  };

  upDatePrecoMaximo = (event) => {
    this.setState({ precoMaximo: event.target.value });
  };

  upDatePrecoMinimo = (event) => {
    this.setState({ precoMinimo: event.target.value });
  };

  upDateCategoria = (event) => {
    this.setState({ classificacaoCategoria: event.target.value })
  }

  upDateOrder = (event) => {
    this.setState({ order: event.target.value })
  }

  upDateSortingParamater = (event) => {
    this.setState({ sortingParamater: event.target.value })
  }
  render() {

    const componentesProdutos = this.state.produtos
      .filter((produto) => {
        return produto.name
          .toLowerCase()
          .includes(this.state.query.toLocaleLowerCase());
      })
      .filter((produto) => {
        return this.state.precoMinimo === "" || produto.valor >= this.state.precoMinimo
      })
      .filter((produto) => {
        return this.state.precoMaximo === "" || produto.valor <= this.state.precoMaximo
      })
      .filter((produto) => {
        return this.state.classificacaoCategoria === "Todas as categorias" || produto.categoria
          .includes(this.state.classificacaoCategoria)
      })
      .sort((produtoAtual, proximoProduto) => {
        switch (this.state.sortingParamater) {
          case "name":
            return this.state.order * produtoAtual.name.localeCompare(proximoProduto.name)
          default:
            return this.state.order * produtoAtual.valor - proximoProduto.valor
        }
      })
      .map((produto) => {
        return (
          <CardProduto
            key={produto.id}
            imageUrl={produto.imageUrl}
            name={produto.name}
            valor={produto.valor}
            adicionarCarrinho={this.adicionarCarrinho}
          />
        );
      });


    const componenteCarrinho = this.state.carrinho.map((produto) => {
      return (
        <ContainerItemCarrinho key={produto.name}>
          <ContainerImgProdCarrinho>
            <ImgProdCarrinho src={produto.imageUrl}/>
          </ContainerImgProdCarrinho>
          <ContainerDescItemCarrinho>
            <p>{produto.quantidade}x</p>
            <ContainerDescricaoItem>{produto.name}</ContainerDescricaoItem>          
            <ContainerPrecoItem>R$ {produto.valor.toFixed(2) * produto.quantidade}</ContainerPrecoItem>          
            <BotaoDeleteItem onClick={() => this.removeItem(produto.name)}><img src={lixeira} alt={"Icone lixeira, remover item do carrinho"}/></BotaoDeleteItem>        
          </ContainerDescItemCarrinho>
        </ContainerItemCarrinho>
      )
    })
   
    // Calculo valor total dos produtos
    const valorTotal =  this.state.carrinho.reduce((acumulador, item) =>  acumulador + item.valor * item.quantidade, 0)

    return (
        <Container>
          <ContainerFiltros>
            {/* <TitleContainerFiltro>Busca</TitleContainerFiltro> */}

            <CampoInput>
              <label>Nome do produto</label>
              <Input
                placeholder="Pesquisa"
                value={this.state.query}
                onChange={this.upDateQuery}
              />
            </CampoInput>

            <CampoInput>
              <label>Preço do produto</label>
              <Input
                placeholder="Preço max."
                value={this.state.precoMaximo}
                onChange={this.upDatePrecoMaximo}
              />

              <Input
                placeholder="Preço min."
                value={this.state.precoMinimo}
                onChange={this.upDatePrecoMinimo}
              />
            </CampoInput>

            <CampoInput>
              <label>Categoria</label>
              <select
                name="classificacaoCategoria"
                value={this.state.classificacaoCategoria}
                onChange={this.upDateCategoria}>
                <option value="Todas as categorias">Todas as categorias </option>
                <option value="Roupas espaciais"> Roupas espaciais </option>
                <option value="Camisetas com estampas divertidas do espaço">Camisetas com estampas divertidas do espaço </option>
                <option value="Brinquedos com tema espacial">Brinquedos com tema espacial</option>

              </select>
            </CampoInput>




          </ContainerFiltros>
          <ContainerHome>
            <BarraInformacoes>
              <p>Quantidade de produtos: {componentesProdutos.length}</p>

              <CampoOrdenacao>
                <label>Ordenar por</label>

                <select
                  name="sortingParamater"
                  value={this.state.sortingParamater}
                  onChange={this.upDateSortingParamater}>
                  <option value="name">Produto</option>
                  <option value="valor"> Preço </option>

                </select>

                <select
                  name="order"
                  value={this.state.order}
                  onChange={this.upDateOrder}>
                  <option value={1}>Crescente </option>
                  <option value={-1}> Decrescente </option>


                </select>

              </CampoOrdenacao>
            </BarraInformacoes>

            <ContainerProdutos>{componentesProdutos}</ContainerProdutos>
          </ContainerHome>

          <ContainerCarrinho>
            <ContainerHeaderCarrinho>
              <h1>Carrinho</h1>
              <img src={CarrinhoDeCompras} alt={"Icone Carrinho de compras"}/>
            </ContainerHeaderCarrinho>
            <ContainerTodosProdutos>
              {componenteCarrinho}
            </ContainerTodosProdutos>
            <div>
              <ContainerValorTotal>
                <p>Valor total:</p>
                <p>R${valorTotal.toFixed(2)}</p>
              </ContainerValorTotal>
              <BotaoLimparCarrinho onClick={this.limparCarrinho}>Limpar carrinho</BotaoLimparCarrinho>
              <BotaoFinalizarCompra onClick={this.limparCarrinho}>Finalizar compra
              </BotaoFinalizarCompra >
             
            </div>
          </ContainerCarrinho>

        </Container>
    );
  }
}

export default App;
