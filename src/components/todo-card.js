import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectTask, decrementPriority, incrementPriority, markFinished, reopenTask, deleteTask, showForm } from '../actions';

const TodoCard = (props) => {
    const renderCloseOrOpen = () => {
        if (props.task.pending) {
            return <button className="button-todo-light" onClick={() => {props.markFinished(props.task)}}>Close</button>
        } else {
            return <button className="button-todo-light" onClick={() => {props.reopenTask(props.task)}}>Reopen</button>
        }
    }

 
    return (<div className="todo-card">
        <div className="todo-text">
            <div className="todo-title">
                {props.task.title}
            </div>
            <div className="todo-description">
                {props.task.description}
            </div>
        </div>
        <div className="todo-details">
            {props.task.status && <div className="todo-status">
                Status: {props.task.status}
            </div>}
            {props.task.deadline && <div className="todo-deadline">
                Deadline: {props.task.deadline}
            </div>}
            <div className="created-at">
                Created On: {props.task.createdAt}
            </div>
            {props.task.category && <div className="todo-cagegory">
                Category: {props.task.category[0].toUpperCase() + props.task.category.slice(1)}
            </div>}
        </div>
        <div className="todo-cta">
            <div className="todo-buttons">
                <button className="button-todo-dark" onClick={() => {props.showForm(); props.selectTask(props.task.id)}}>Edit</button>
                {renderCloseOrOpen()}
                <Link to={`/delete/${props.task.id}`} className="button-todo-light">Delete</Link>
            </div>
            <div className="todo-priority">
                <svg className="todo-priority-arrow" onClick={() => {props.incrementPriority(props.task)}} viewBox="0 0 20 20">
                <path d="M15.484 12.452c-0.436 0.446-1.043 0.481-1.576 0l-3.908-3.747-3.908 3.747c-0.533 0.481-1.141 0.446-1.574 0-0.436-0.445-0.408-1.197 0-1.615 0.406-0.418 4.695-4.502 4.695-4.502 0.217-0.223 0.502-0.335 0.787-0.335s0.57 0.112 0.789 0.335c0 0 4.287 4.084 4.695 4.502s0.436 1.17 0 1.615z"></path>
                </svg>
                <div className="todo-priority-value">{(props.task.pending) ? props.task.priority : 'NA'}</div>
                <svg className="todo-priority-arrow" onClick={() => {props.decrementPriority(props.task)}} viewBox="0 0 20 20">
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
            </div>
        </div>
    </div>)
}

const mapStateToProps = state => {
    return {
        selectedTask: state.selectedTask
    }
}

export default connect(mapStateToProps, { selectTask, decrementPriority, incrementPriority, markFinished, reopenTask, deleteTask, showForm })(TodoCard)