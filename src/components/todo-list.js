import React from 'react';
import TodoCard from './todo-card';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllTasks, showForm } from '../actions';

const TodoList = (props) => {
    React.useEffect(()=>{
        if(props.auth.userId) {
            props.getAllTasks(props.auth.userId);  
        }
    }, [props.auth.userId])

    const renderRemoveCategoryButton = () => {
        if(props.selectedCategory) {
        return <div className="todo-list-button">
                <Link to={`/delete/category/${props.selectedCategory.id}`} className="button-todo-light">Remove {props.selectedCategory.name} category</Link>
            </div>
        }
    }
    const renderList = () => {
        return props.tasks.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
        .map(task => {
            return(<TodoCard key={task.id} task={task}/>)
            }
        )
    }
    return(<div className="todo-list">
        <div className="todo-list-button">
            <button className="button-todo-light" onClick={() => props.showForm()}>Add a task</button>
        </div>
        {props.auth.userId && renderList()}
        {renderRemoveCategoryButton()}
    </div>)
}

const mapStateToProps = state => {
    return {
        tasks: Object.values(state.tasks),
        selectedCategory: state.selectedCategory,
        auth: state.auth
    };
}

export default connect(mapStateToProps, { getAllTasks, showForm })(TodoList);