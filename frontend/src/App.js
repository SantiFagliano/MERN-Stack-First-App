import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navigation from './components/Navigation';
import NoteList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={NoteList} />
      <Route exact path="/edit/:id" component={CreateNote} />
      <Route exact path="/create" component={CreateNote} />
      <Route exact path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
