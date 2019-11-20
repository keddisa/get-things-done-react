import React from 'react';
import { connect } from 'react-redux';

import { deleteTask, selectTask } from '../actions';
import Modal from './modal';
import history from '../history';

const DeleteTask = (props) => {
    const renderActions = () => {
        return (
            <div className="modal-buttons">
                <button className="modal-yes button-primary-dark" onClick={()=>props.deleteTask(props.match.params.id)}>
                    Yes
                </button>
                <button className="modal-no button-primary-dark" onClick={()=>history.push('/')}>
                    No
                </button>
            </div>
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