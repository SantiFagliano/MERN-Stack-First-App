import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }

    async componentDidMount() {
        this.getUsers();
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        });
        this.setState({ username: '' });
        this.getUsers();
    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.getUsers();

    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 ">
                    <h3>Crea un Usuario</h3>
                    <div className="card text-white bg-dark mb-3" >
                        <div className="card-header border-bottom border-white">
                            Formulario
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-group mb-3 ">
                                    <span className="input-group-text bg-secondary text-white">Nombre</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese un nombre de usuario"
                                        value={
                                            this.state.username
                                        }
                                        onChange={this.onChangeUsername}
                                    />
                                </div>
                                <div className="input-group mb-3 justify-content-end">
                                    <button className="btn btn-outline-success" type="submit">
                                        Crear Usuario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <h3>Lista de Usuarios</h3>
                    <ul className="list-group">
                        {
                            this.state.users.map
                                (user =>
                                    <li
                                        className="list-group-item list-group-item-action"
                                        key={user._id}
                                        onDoubleClick={() => this.deleteUser(user._id)}>
                                        Nombre: <span className="fw-bold text-success">{user.username}</span>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
