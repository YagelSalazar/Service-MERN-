import React, { Component } from 'react';

class Ordenes extends Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      cuatri: '',

      fecha_soli: '',
      fecha_entre: '',

      tiempo: '',
      precio: '',
      servicio: '',
      finan: '',
      resul: '',

      evaluaciones: []
    };
    this.handeleChange = this.handeleChange.bind(this);
    this.addEvalucion = this.addEvalucion.bind(this);
  }

  addEvalucion(e) {

    fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        M.toast({ html: 'Evaluacion Guardada' });
        this.setState({
          fecha_soli: '',
          fecha_entre: '',

          tiempo: '',
          precio: '',
          servicio: '',
          finan: '',
          resul: ''
        });
        this.fetchEvaluacion();
      })
      .catch(err => console.error(err));

    e.preventDefault();
  }

  componentDidMount() {
    this.fetchEvaluacion();
  }

  fetchEvaluacion() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({ evaluaciones: data });
        console.log(this.state.evaluaciones)
      })
  }

  deleteEvaluacion(_id) {
    if (confirm('Desea eliminar esta Evaluación')) {
      fetch(`/api/tasks/${_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: 'Evaluacion Eliminada' })
          this.fetchEvaluacion();
        })
    }
  }

  handeleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }


  render() {

    function sum(a, b, c, d) {
      return (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d))
    }

    const total = this.state.evaluaciones.reduce(function (acum, eva) {
      return (acum + parseFloat(eva.resul));
    }, 0);

    const lar = this.state.evaluaciones.map(or => {
      return (or.resul);
    });

    function pro(x, y) {
      var pr = (x / y);
      if (pr >= 10 & pr <= 12) {
        return ('Confiable');
      }
      else if (pr >= 7 & pr <= 10) {
        return ('Condicionado');
      }
      else if (pr >= 4 & pr <= 7) {
        return ('No Confiable')
      }
      else {
        return ('No Evaluado')
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    });

    return (
      <div>
        <div>
          <div className="row">
            <div className="col s3">
              <div className="card">
                <div className="card-content">
                  {/*Formulario*/}
                  <form onSubmit={this.addEvalucion}>
                    <div className="row">
                      <h6>Cuatrimestre</h6>
                      <div className="input-field col s12" >
                        <select onChange={this.handeleChange} name="cuatri" value={this.state.cuatri} >
                          <option>Cuatrimestre</option>
                          <option>Enero-Abril</option>
                          <option>Mayo-Agosto</option>
                          <option>Septiembre-Diciembre</option>
                        </select>
                      </div>
                    </div>
                    <h6>Evaluación</h6>
                    <div className="row">
                      <div className="input-field col s6">
                        <label>Fecha Solicitada</label>
                        <input
                          name="fecha_soli"
                          type="date"
                          onChange={this.handeleChange}
                          placeholder="Fecha Solicitada"
                          value={this.state.fecha_soli} />
                      </div>
                      <div className="input-field col s6">
                        <label>Fecha de Entrega</label>
                        <input
                          name="fecha_entre"
                          type="date"
                          onChange={this.handeleChange}
                          placeholder="Fecha de entrega"
                          value={this.state.fecha_entre} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s6">
                        <select onChange={this.handeleChange} name="tiempo" value={this.state.tiempo}>
                          <option selected>Tiempo de entrega</option>
                          <option>3</option>
                          <option>2</option>
                          <option>1</option>
                        </select>
                      </div>
                      <div className="input-field col s6">
                        <select onChange={this.handeleChange} name="precio" value={this.state.precio}>
                          <option selected>Precio</option>
                          <option>3</option>
                          <option>2</option>
                          <option>1</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s6">
                        <select onChange={this.handeleChange} name="servicio" value={this.state.servicio}>
                          <option selected>Servicio post-venta</option>
                          <option>3</option>
                          <option>2</option>
                          <option>1</option>
                        </select>
                      </div>
                      <div className="input-field col s6">
                        <select onChange={this.handeleChange} name="finan" value={this.state.finan}>
                          <option selected>Financiamiento</option>
                          <option>3</option>
                          <option>2</option>
                          <option>1</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s6">
                        <label>Total</label>
                        <input
                          name="resul"
                          type="text"
                          placeholder="Total"
                          onChange={this.handeleChange}
                          value={this.state.resul = sum(this.state.precio, this.state.servicio, this.state.tiempo, this.state.finan)} />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s9">
              <table>
                <thead>
                  <th>No. de Solicitud</th>
                  <th>Fecha solicitada</th>
                  <th>Fecha de entrega</th>
                  <th>Tiempo de entrega</th>
                  <th>Precio</th>
                  <th>Servicio post-venta</th>
                  <th>Financiamiento</th>
                  <th>Resultado</th>
                  <th></th>
                </thead>
                <tbody>
                  {
                    this.state.evaluaciones.map((eva, i) => {
                      return (
                        <tr key={eva._id} >
                          <td>{i + 1}</td>
                          <td>{eva.fecha_entre}</td>
                          <td>{eva.fecha_soli}</td>
                          <td>{eva.tiempo}</td>
                          <td>{eva.precio}</td>
                          <td>{eva.servicio}</td>
                          <td>{eva.finan}</td>
                          <td>{eva.resul}</td>
                          <td>
                            <button className="btn light-blue darken-3 waves-light"
                              style={{ margin: '4px' }}
                              onClick={() => this.deleteEvaluacion(eva._id)}>
                              <i className="material-icons">delete</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {/*Promedio*/}
              <div className="col s3">
                <div className="card">
                  <div className="card-content">
                    <h5>Resultado</h5>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          type="text"
                          value={pro(total, lar.length)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Ordenes;
