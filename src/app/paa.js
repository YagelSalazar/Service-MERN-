import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './Nav'
import AddProvider from './AddProvider'
import Providers from './Providers'
import Orders from './Orders'
import Requests from './Requests'

class App extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            rfc: '',
            address: '',
            phone: '',
            contact: '',
            email: '',
            classification: '',
            providers: [],
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addProvider = this.addProvider.bind(this)
    }

    addProvider(e) {
        if (this.state._id) {
            fetch(`/api/providers/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Provider updated' })
                    this.setState({ name: '', rfc: '', address: '', phone: '', contact: '', email: '', classification: '', _id: '' })
                    this.fetchProviders()
                })
        } else {
            fetch('/api/providers', {
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
                    M.toast({ html: 'Provider Saved' })
                    this.setState({ name: '', rfc: '', address: '', phone: '', contact: '', email: '', classification: '', _id: '' })
                    this.fetchProviders()
                })
                .catch(err => console.error(err))
        }

        e.preventDefault()
    }

    componentDidMount() {
        this.fetchProviders()
    }

    fetchProviders() {
        fetch('/api/providers')
            .then(res => res.json())
            .then(data => {
                this.setState({ providers: data })
                console.log(this.state.providers)
            })
    }

    deleteProvider(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/providers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Provider deleted' })
                    this.fetchProviders()
                })
        }
    }

    editProvider(id) {
        fetch(`/api/providers/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    name: data.name,
                    rfc: data.rfc,
                    address: data.address,
                    phone: data.phone,
                    contact: data.contact,
                    email: data.email,
                    classification: data.classification,
                    _id: data._id
                })
            })
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/addprovider" component={AddProvider} />
                        <Route path="/proveedores" component={Providers} />
                        <Route path="/solicitudes" component={Requests} />
                        <Route path="/ordenes" component={Orders} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

const Home = () => (
    <div>
      <h1>Home page</h1>
    </div>
  )

export default App