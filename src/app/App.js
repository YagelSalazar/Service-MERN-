import React, { Component } from 'react'

import Nav from './Nav'
import Solicitudes from './Solicitudes'
import Catalogo from './Catalogo'
import Ordenes from './Ordenes'
import AddProvider from './AddProvider'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/solicitudes" component={Solicitudes} />
          <Route path="/catalogo" component={Catalogo} />
          <Route path="/ordenes" component={Ordenes} />
          <Route path="/addprovider" component={AddProvider} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home page</h1>
  </div>
)

export default App;