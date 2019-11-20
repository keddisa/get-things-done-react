import React from 'react';
import TodoCard from './todo-card';
import { connect } from 'react-redux';
import { getAllTasks, getTasksByCategory, deleteCategory } from '../actions';

const TodoList = (props) => {
    React.useEffect(()=>{
        props.getAllTasks();     
    }, [])

    const renderRemoveCategoryButton = () => {
        if(props.selectedCategory) {
        return <div className="remove-category-button">
                <button className ="button-todo-light" onClick={() => props.deleteCategory(props.selectedCategory.id)}>Remove {props.selectedCategory.name} category</button>
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
        {renderList()}
        {renderRemoveCategoryButton()}
    </div>)
}

const mapStateToProps = state => {
    return {
        tasks: Object.values(state.tasks),
        selectedCategory: state.selectedCategory
    };
}

export default connect(mapStateToProps, { getAllTasks, getTasksByCategory, deleteCategory })(TodoList);