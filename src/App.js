import React from 'react';
import { Router, Route } from 'react-router-dom';

import './App.css';

import history from './history';

import Header from './components/header';
import Navbar from './components/navbar';
import TodoList from './components/todo-list';
import TodoCategories from './components/todo-categories';
import TodoForm from './components/todo-form';
import DeleteTask from './components/delete-task';

function App() {
  const Main = () => {
    return(<React.Fragment>
      <Navbar />
      <Header />
      <TodoForm />
      <TodoCategories />
      <TodoList />
    </React.Fragment>)
  }

  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/delete/:id" exact component={DeleteTask} />
      </Router>
    </div>
  );
}

export default App;
