import React from 'react';
import { Link } from 'react-router-dom'

function Nav() {

    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo right">ITSOEH</a>
                <ul className="left hide-on-med-and-down">
                    <li><Link to="/solicitudes">Solicitudes de compra</Link></li>
                    <li><Link to="/catalogo">Catalogo de proveedores</Link></li>
                    <li><Link to="/ordenes">Ordenes de compra</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
