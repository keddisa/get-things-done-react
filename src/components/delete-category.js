import React from 'react';
import { connect } from 'react-redux';

import { deleteCategory } from '../actions';
import Modal from './modal';
import history from '../history';

const DeleteCategory = (props) => {
    const renderActions = () => {
        return (
            <div className="modal-buttons">
                <button className="modal-yes button-todo-dark" onClick={()=>props.deleteCategory(props.match.params.id)}>
                    Yes
                </button>
                <button className="modal-no button-todo-light" onClick={()=>history.push('/')}>
                    No
                </button>
            </div>
        )
    }

    return(<div>
        <Modal 
                title="Are you sure you want to delete this category?"
                actions={renderActions()}
            />
    </div>)
}



export default connect(null, { deleteCategory })(DeleteCategory);