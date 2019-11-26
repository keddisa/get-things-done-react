import { combineReducers } from 'redux';
import _ from 'lodash';

const tasksReducer = (state={}, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case 'GET_CATEGORY':
            return { ..._.mapKeys(action.payload, 'id') };
        case 'ADD_TASK':
            return { ...state, [action.payload.id ]: action.payload };
        case 'EDIT_TASK':
        case 'INCREMENT_PRIORITY':
        case 'DECREMENT_PRIORITY':
        case 'MARK_FINISHED':
        case 'REOPEN_TASK':
        case 'DELETE_TASK':
            return { ...state, [action.payload.id ]: action.payload };
        default:
            return state;
    }
}

const selectedTaskReducer = (selectedTask=null, action) => {
    if (action.type === 'SELECT_TASK') {
        return action.payload;
    } else if(action.type === 'CLEAR_TASK') {
        return null;
    }
    return selectedTask;
}

const categoriesReducer = (categories={}, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return { ...categories, ..._.mapKeys(action.payload, 'id') };
        case 'ADD_CATEGORY':
            return { ...categories, [action.payload.id ]: action.payload };
        case 'EDIT_CATEGORY':
            return { ...categories, [action.payload.id ]: action.payload };
        case 'DELETE_CATEGORY':
            return _.omit(categories, action.payload);
        default:
            return categories;
    }
}

const selectedCategoryReducer = (selectedCategory=null, action) => {
    if (action.type === 'SELECT_CATEGORY') {
        return action.payload;
    }
    return selectedCategory;
}

const authReducer = (state={isSignedIn: null, userId: null}, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return {...state, isSignedIn: true, userId: action.payload};
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userId: null};
        default:
            return state;
    }
}

const showFormReducer = (showForm=false, action) => {
    if(action.type === 'SHOW_FORM') {
        return true;
    } else if(action.type === 'HIDE_FORM') {
        return false;
    }
    return showForm;
}

export default combineReducers ({
    tasks: tasksReducer,
    selectedTask: selectedTaskReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    showForm: showFormReducer,
    auth: authReducer
});
