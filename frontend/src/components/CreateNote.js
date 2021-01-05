import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {
    state = {
        users: [],
        author: '',
        content: '',
        title: '',
        date: new Date()
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data.map(user => user.username) });
    }

    async componentDidMount() {
        this.getUsers();
    }

    onSubmit = (e) => {
        console.log(this.state.title, this.state.content)
        e.preventDefault();

    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4 className="text-center">Crea Una Nota</h4>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="author" className="form-label">Elegir un Usuario</label>
                            <select name="author" id="author" className="form-select" onChange={this.onInputChange} >
                                {
                                    this.state.users.map(user => <option key={user} value={user}>
                                        {user}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="title" className="form-label">Titulo de la Nota</label>
                            <input type="text" name="title" className="form-control" placeholder="Escriba el titulo de la Nota" required onChange={this.onInputChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="content" className="form-label">Ingrese una descripcion de Nota</label>
                            <textarea name="content" id="content" cols="30" rows="3" className="form-control" onChange={this.onInputChange}></textarea>
                        </div>
                        <div className="form-group mb-3 text-center">
                            <label htmlFor="date" className="form-label col-12 text-start">Ingrese una fecha de Nota</label>
                            <DatePicker className="form-control" name="date" selected={this.state.date} onChange={this.onChangeDate} />
                        </div>

                        <div className="form-group mb-3 justify-content-end">
                            <button className="btn btn-outline-success" type="submit">
                                Crear Nota
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
