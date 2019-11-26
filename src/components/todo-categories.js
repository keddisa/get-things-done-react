import React from 'react';
import { connect } from 'react-redux';

import { getAllTasks, getTasksByCategory, getAllCategories, addCategory, selectCategory } from '../actions';

const TodoCategories = (props) => {
    React.useEffect(()=>{
        props.getAllCategories(props.userId);     
    }, [])

    let [category, setCategory] = React.useState('')

    const renderCategoryButtons = () => {
        return props.categories.map(category => {
    return <button key={category.id} className="button-todo-dark" onClick={() => {props.getTasksByCategory(`${category.name}`, category.creatorId); props.selectCategory(`${category.id}`)}}>{category.name}</button>
        })
    }

    const onSubmitCategory = (e) => {
        e.preventDefault();
        props.addCategory({name: category, creatorId: props.userId})
    }

    return(<div className="todo-categories">
        <div className="category-buttons">
            <button className="button-todo-dark" onClick={() => {props.getAllTasks(); props.selectCategory()}}>All</button>   
            {renderCategoryButtons()}
        </div>
        <form className="category-add" onSubmit={onSubmitCategory}>
            <div className="field-add-category">
                <input onChange={e => setCategory(e.target.value)} value={category} name="category" type="text" placeholder="e.g. Work Stuff" className="form-element"/>
            </div>
            <button className="button-todo-light button-add-category">Add a category</button>
        </form> 
        </div>)
}

const mapStateToProps = state => {
    return {
        categories: Object.values(state.categories),
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { getAllTasks, getTasksByCategory, getAllCategories, addCategory, selectCategory })(TodoCategories);