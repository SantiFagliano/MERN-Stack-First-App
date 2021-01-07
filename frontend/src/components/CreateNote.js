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
        date: new Date(),
        editing: false,
        _id: ''
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            author: res.data[0].username
        });
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);

            this.setState({
                title: res.data.title,
                content: res.data.content,
                author: res.data.author,
                date: new Date(res.data.date),
                editing: true,
                _id: this.props.match.params.id
            });
        }
    }

    async componentDidMount() {
        this.getUsers();
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.author
        };
        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);

        } else {
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/';

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
                            <select name="author" id="author" className="form-select" onChange={this.onInputChange} value={this.state.author}>
                                {
                                    this.state.users.map(user => <option key={user} value={user}>
                                        {user}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="title" className="form-label">Titulo de la Nota</label>
                            <input type="text" name="title" className="form-control"
                                placeholder="Escriba el titulo de la Nota" required onChange={this.onInputChange} value={this.state.title} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="content" className="form-label">Ingrese una descripcion de Nota</label>
                            <textarea name="content" id="content" cols="30" rows="3" className="form-control" onChange={this.onInputChange} value={this.state.content}></textarea>
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
