import React, { Component } from 'react'

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
            <div>
                {/*Navigation*/}
                <nav className="nav-extended">
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><a href="#test1">Solicitudes</a></li>
                            <li className="tab"><a className="active" href="#test2">Proveedores</a></li>
                            <li className="tab"><a href="#test4">Ordenes de compra</a></li>
                        </ul>
                    </div>
                    <div className="nav-content">
                        <a className="btn-floating btn-large halfway-fab waves-effect waves-light teal" href="./addProvider.js">
                            <i className="material-icons">add</i>
                        </a>
                    </div>
                </nav>

                {/*Aplication form and components*/}
                <div className="container">
                    <div className="row">
                        <div className="col s3">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProvider}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Provider name" onChange={this.handleChange} name="name" value={this.state.name} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Provider RFC" onChange={this.handleChange} name="rfc" value={this.state.rfc} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Provider address" onChange={this.handleChange} name="address" value={this.state.address} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Provider phone" onChange={this.handleChange} name="phone" value={this.state.phone} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Provider contact" onChange={this.handleChange} name="contact" value={this.state.contact} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Provider email" onChange={this.handleChange} name="email" value={this.state.email} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="classification" onChange={this.handleChange} name="classification" value={this.state.classification} />
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s9">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>RFC</th>
                                        <th>Domicilio</th>
                                        <th>Telefono</th>
                                        <th>Contacto</th>
                                        <th>Email</th>
                                        <th>Clasificacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.providers.map(provider => {
                                            return (
                                                <tr key={provider._id}>
                                                    <td>{provider.name}</td>
                                                    <td>{provider.rfc}</td>
                                                    <td>{provider.address}</td>
                                                    <td>{provider.phone}</td>
                                                    <td>{provider.contact}</td>
                                                    <td>{provider.email}</td>
                                                    <td>{provider.classification}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => { this.deleteProvider(provider._id) }}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button onClick={() => this.editProvider(provider._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App