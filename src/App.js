import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import './App.css';

import history from './history';

import Header from './components/header';
import Navbar from './components/navbar';
import TodoList from './components/todo-list';
import TodoCategories from './components/todo-categories';
import TodoForm from './components/todo-form';
import DeleteTask from './components/delete-task';
import DeleteCategory from './components/delete-category';
import Footer from './components/footer';

function App(props) {
  const Main = () => {
    return(<React.Fragment>
      <Navbar />
      <Header />
      {props.isSignedIn && <React.Fragment>
        <TodoCategories />
        {props.showForm && <TodoForm />}
        <TodoList />
      </React.Fragment>}
      <Footer />
    </React.Fragment>)
  }

  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/delete/:id" exact component={DeleteTask} />
        <Route path="/delete/category/:id" exact component={DeleteCategory} />
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      isSignedIn: state.auth.isSignedIn,
      showForm: state.showForm
  };
}

export default connect(mapStateToProps)(App);
