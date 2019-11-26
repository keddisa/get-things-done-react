import React from 'react';
import { connect } from 'react-redux';

import { deleteTask, selectTask } from '../actions';
import Modal from './modal';
import history from '../history';

const DeleteTask = (props) => {
    const renderActions = () => {
        return (
            <React.Fragment>
                <button className="modal-yes button-todo-dark" onClick={()=>props.deleteTask(props.match.params.id)}>
                    Yes
                </button>
                <button className="modal-no button-todo-light" onClick={()=>history.push('/')}>
                    No
                </button>
            </ React.Fragment>
        )
    }

    return(<div>
        <Modal 
                title="Are you sure you want to delete this task?"
                actions={renderActions()}
            />
    </div>)
}



export default connect(null, { deleteTask, selectTask })(DeleteTask);