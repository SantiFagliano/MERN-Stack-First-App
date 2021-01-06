import React, { Component } from 'react'
import axios from 'axios';
import { format } from 'timeago.js';
export default class NotesList extends Component {
    state = {
        notes: []
    }

    async componentDidMount() {
        this.getNotes();

    }
    async getNotes() {
        const res = await axios.get('http://localhost:4000/api/notes');
        this.setState({ notes: res.data });
    }
    deleteNote = async (id) => {
        const res = await axios.delete('http://localhost:4000/api/notes/' + id);
        this.getNotes();

    }
    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 mb-2" key={note._id}>
                            <div className="card">
                                <div className="card-header row justify-content-between">
                                    <p className="col-10">{note.title}</p>
                                    <button onClick={() => this.deleteNote(note._id)} className="col-2 btn-close" type="button" aria-label="Close" data-toggle="tooltip" data-placement="top" title="Eliminar Nota"></button>
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>{note.content}</p>
                                        <footer className="blockquote-footer mt-1">{note.author}</footer>
                                        <footer className="blockquote-footer ">{format(note.date)}</footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
