import React from 'react';

const InputElement = (props) => {
    let inputElement = null;
    const renderCategoryOptions = () => {
        return props.categories.map(category =>{
            return <option key={category.key} value={category.name}>{category.name.toUpperCase()}</option>
        })
    }
    let inputClass = `form-element ${!props.formvalidation[props.name].valid && props.formvalidation[props.name].touched ? 'form-error' : ''}`
    switch (props.inputtype) {
        case('input'):
            inputElement = <input {...props} className={inputClass} />
            break;
        case('textArea'):
            inputElement = <textarea {...props} className={inputClass}/>
            break;
        case('dropdown'):
            inputElement = <select {...props} className={inputClass} name="category" defaultValue="">
                <option hidden disabled value=""> -- select an option -- </option>
                {renderCategoryOptions()}
            </select>  
            break;
        default:
            inputElement = <input {...props} className={inputClass}/>
    }
    const renderError = () => {
        if (!props.formvalidation[props.name].valid && props.formvalidation[props.name].touched) {
            return ( 
                <div className="form-error-message">
                    {props.formvalidation[props.name].errorMessage}
                </div>
                )
        }
        
    }
    return(<div>
        {props.name && <label>{props.name.toUpperCase()}</label>}
        {inputElement}
        {renderError()}
    </div>)
}

export default InputElement