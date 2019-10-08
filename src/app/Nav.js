import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {

    render() {
        return (
            <nav className="nav-extended">
                <div className="nav-content">
                    <ul className="tabs tabs-transparent">
                        <Link to="/solicitudes">
                            <li className="tab">Solicitudes</li>
                        </Link>
                        <Link to="/proveedores">
                            <li className="tab">Proveedores</li>
                        </Link>
                        <Link to="/ordenes">
                            <li className="tab"><a>Ordenes de compra</a></li>
                        </Link>
                    </ul>
                </div>
                <div className="nav-content">
                    <Link className="btn-floating btn-large halfway-fab waves-effect waves-light teal" to="/addprovider">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Nav