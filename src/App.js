import React, {Component} from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import Estilo from "./Estilo.css"


class App extends Component {

  state= {
    termino: '',
    imagenes: [],
    pagina: '',
  }

  scroll= () => {
    const elemento =document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    //Leer el state de la pagina actual
    let pagina= this.state.pagina;

    //Leer si la pagina es 1, en ese caso no ir hacia atrás

    if(pagina===1) return null;

    //Resta 1 a la pagina actual
    pagina --;

    //Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }  
  
  paginaSiguiente = () => {
    //Leer el state de la pagina actual
    let pagina= this.state.pagina;

    //Sumar 1 a la pagina actual
    pagina ++;

    //Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }  

  consultarApi= () => {
    const termino= this.state.termino;
    const pagina= this.state.pagina;
    const url= `https://pixabay.com/api/?key=12587887-6624c06f47c601fc30893f034&q=${termino}&per_page=32&page=${pagina}`;
    //console.log(url);
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({imagenes: resultado.hits}))
  }

  datosBusqueda= (termino) => {
    this.setState({
      termino: termino,
      pagina: 1,
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return(
      <div className="app container">
        <div className="jumbotron">
          <p className="lead  text-center tamaño"><b>Buscador de imagenes</b></p>
          <br></br>
          <Buscador datosBusqueda={this.datosBusqueda}> 
          </Buscador>
          <hr className="my-4"></hr>
        </div>
        
        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
