import todoAPI from '../api/java-todo-api'
import history from '../history'

export const getAllTasks = () => async dispatch => {
    const response = await todoAPI.get('/tasks/');
    dispatch ({
        type: "GET_TASKS",
        payload: response.data
    });
}

export const selectTask = id => async dispatch => {
    const response = await todoAPI.get(`/tasks/${id}`);
    dispatch ({
        type: "SELECT_TASK",
        payload: response.data
    });
}



export const getTasksByCategory = (category) => async dispatch => {
    const response = await todoAPI.get(`/tasks/category/${category}`);
    dispatch ({
        type: "GET_CATEGORY",
        payload: response.data
    });
}

export const selectCategory = id => async dispatch =>{
    if(id) {
        const response = await todoAPI.get(`/categories/${id}`)
        dispatch ({
            type: "SELECT_CATEGORY",
            payload: response.data
        })
    } else {
        dispatch ({
            type: "SELECT_CATEGORY",
            payload: null
        })
    }
}

export const addTask = task => async dispatch => {
    const response = await todoAPI.post('/tasks/', task);
    dispatch ({
        type: "ADD_TASK",
        payload: response.data
    });
    history.push('/')
}

export const editTask = task => async dispatch => {
    const response = await todoAPI.put('/tasks/', task);
    dispatch ({
        type: "EDIT_TASK",
        payload: response.data
    });
    history.push('/')
}

export const incrementPriority = task => async dispatch => {
    let newTask = {...task, priority: task.priority+1}
    const response = await todoAPI.put('/tasks/', newTask);
    dispatch ({
        type: "INCREMENT_PRIORITY",
        payload: response.data
    });
}

export const decrementPriority = task => async dispatch => {
    let newTask = {...task, priority: task.priority-1}
    const response = await todoAPI.put('/tasks/', newTask);
    dispatch ({
        type: "DECREMENT_PRIORITY",
        payload: response.data
    });
}

export const markFinished = task => async dispatch => {
    let newTask = {...task, pending: false, status: "CLOSED", priority: 11}
    const response = await todoAPI.put('/tasks/', newTask);
    dispatch ({
        type: "MARK_FINISHED",
        payload: response.data
    });
}

export const reopenTask = task => async dispatch => {
    let newTask = {...task, pending: true, status: "REOPENED", priority: 1}
    const response = await todoAPI.put('/tasks/', newTask);
    dispatch ({
        type: "REOPEN_TASK",
        payload: response.data
    });
}

export const deleteTask = id => async dispatch => {
    const response = await todoAPI.put(`/tasks/remove/${id}`);
    dispatch ({
        type: "DELETE_TASK",
        payload: response.data
    });
    history.push('/');
}

export const getAllCategories = () => async dispatch => {
    const response = await todoAPI.get('/categories/');
    dispatch ({
        type: "GET_CATEGORIES",
        payload: response.data
    });
}

export const addCategory = category => async dispatch => {
    const response = await todoAPI.post('/categories/', category);
    dispatch ({
        type: "ADD_CATEGORY",
        payload: response.data
    });
    history.push('/')
}

export const deleteCategory = id => async dispatch => {
    const response = await todoAPI.delete(`/categories/delete/${id}`);
    dispatch ({
        type: "DELETE_CATEGORY",
        payload: response.data
    });
    history.push('/');
}