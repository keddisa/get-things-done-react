import React from 'react';
import { connect } from 'react-redux';

import InputElement from './input-element';
import { addTask, editTask, getAllCategories, hideForm } from '../actions';

const TodoForm = (props) => {
    React.useEffect(()=>{
        setFormValues({
            title, description, deadline, status, priority, category, id, creatorId: props.userId
        })
        props.getAllCategories();
    },[props.userId])
    let title = "";
    let description = "";
    let deadline = "";
    let status = "";
    let priority = 1;
    let category = "";
    let id = null;
    let creatorId = props.userId;
    let isFormValid = false;
    
    let [activeButton, setActiveButton] = React.useState(false)


    let [formValues, setFormValues] = React.useState({
        title, description, deadline, status, priority, category, id, creatorId
    })
    let [formValidation, setFormValidation] = React.useState({
        title: {
            requirements: {
                required: true,
                minLength: 5,
                maxLength: 50
            },
            errorMessage: "5- 50 characters",
            valid: false,
            touched: false
        },
        description: {
            requirements: {
                required: false,
                maxLength: 200
            },
            errorMessage: "Max 200 characters",
            valid: true,
            touched: false
        },
        status: {
            requirements: {
                required: false,
                maxLength: 30
            },
            errorMessage: "Max 30 characters",
            valid: true,
            touched: false
        },
        deadline: {
            requirements: {
                required: false
            },
            errorMessage: "Not required",
            valid: true,
            touched: false
        },
        priority: {
            requirements: {
                required: true,
                minValue: 1,
                maxValue: 10
            },
            errorMessage: "Only numbers from 1-10",
            valid: true,
            touched: false
        },
        category: {
            requirements: {
                required: true,
                maxLength: 15
            },
            errorMessage: "Max 15 characters",
            valid: false,
            touched: false
        }
    })
   
    React.useEffect(() => {
        if(props.selectedTask) {
            setFormValues({
                title: props.selectedTask.title, 
                description: props.selectedTask.description, 
                deadline: props.selectedTask.deadline, 
                status: props.selectedTask.status, 
                priority: props.selectedTask.priority, 
                category: props.selectedTask.category, 
                id: props.selectedTask.id,
                creatorId: props.userId
            })
            setActiveButton(true);
        } 
    },[props.selectedTask])

    const onSubmitForm = event => {
        event.preventDefault();
        if (formValues.creatorId) {
            if (formValues.id) {
                props.editTask(formValues)
            } else {
                props.addTask(formValues)
            }
            props.hideForm();
        }
    }

    const onInputChange = (e) => {
        let updatedFormValues = {...formValues}
        updatedFormValues[e.target.name] = e.target.value
        setFormValues(updatedFormValues)
        let updatedFormValidation = {...formValidation}
        updatedFormValidation[e.target.name].valid 
            = checkValidity(updatedFormValidation[e.target.name], updatedFormValues[e.target.name])
        updatedFormValidation[e.target.name].touched = true;
        setFormValidation({...updatedFormValidation});
        isFormValid = true;
        Object.keys(formValidation).forEach(inputElement => {
            isFormValid = formValidation[inputElement].valid && isFormValid
        })
        setActiveButton(isFormValid)
        
        
    }

    const checkValidity = (validation, value) => {
        let isValid = true;
        if(validation.requirements.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(validation.requirements.minLength) {
            isValid = value.length >= validation.requirements.minLength && isValid;
        }
        if(validation.requirements.maxLength) {
            isValid = value.length <= validation.requirements.maxLength && isValid;
        }
        if(validation.requirements.minValue) {
            isValid = value >= validation.requirements.minValue && isValid;
        }
        if(validation.requirements.maxValue) {
            isValid = value <= validation.requirements.maxValue && isValid;
        }
        return isValid;
    }

    return(<form className="todo-form" onSubmit={onSubmitForm}>
        <InputElement onChange={onInputChange} value={formValues.title} formvalidation={formValidation} name="title" type="text" placeholder="e.g. Eat Breakfast"/>
        <InputElement onChange={onInputChange} value={formValues.description} formvalidation={formValidation} name="description" type="text" placeholder="e.g. mix cereal and milk in a bowl"/>
        <InputElement onChange={onInputChange} value={formValues.deadline} formvalidation={formValidation} name="deadline" type="date"/>
        <InputElement onChange={onInputChange} value={formValues.status} formvalidation={formValidation} name="status" type="text" placeholder="e.g. About to start"/>
        <InputElement onChange={onInputChange} value={formValues.priority} formvalidation={formValidation} name="priority" type="number" placeholder="This is anumber"/>
        <InputElement onChange={onInputChange} value={formValues.category} formvalidation={formValidation} inputtype="dropdown" categories={props.categories} name="category" type="text" placeholder="e.g. Professional/ Personal"/>
        <button className="button-todo-dark" disabled={!activeButton} style={{height:'3rem', alignSelf:'end'}}>Submit</button>
        <a className="button-todo-light" onClick={()=>props.hideForm()}>Cancel</a>
    </form>)
}

const mapStateToProps = state => {
    return {
        tasks: Object.values(state.tasks),
        selectedTask: state.selectedTask,
        categories: Object.values(state.categories),
        userId: state.auth.userId
    };
}

export default connect(mapStateToProps, { addTask, editTask, getAllCategories, hideForm })(TodoForm);