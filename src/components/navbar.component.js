import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">DuckFeed Tracker</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className = "nav-link">Duck Feed List</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/create" className = "nav-link">Create Feed Info</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/user" className = "nav-link">Create User(Admin Only)</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/dashboard" className = "nav-link">Dashboard/Reporting(Admin Only)</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
} 