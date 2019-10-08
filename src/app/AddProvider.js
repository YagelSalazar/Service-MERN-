import React, { Component } from 'react'

class AddProvider extends Component {

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
                                        <button className="btn light-blue darken-4" type="submit">Agregar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProvider