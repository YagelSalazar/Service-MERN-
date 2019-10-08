import React, { Component } from 'react'


class Providers extends component {

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
                    'Accept': 'AddProviderlication/json',
                    'Content-Type': 'AddProviderlication/json'
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
                    'Accept': 'AddProviderlication/json',
                    'Content-Type': 'AddProviderlication/json'
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
                <div className="container">
                    <div className="row">
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
        )

    }

}

export default Providers;
