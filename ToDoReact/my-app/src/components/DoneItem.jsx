import React from "react";
import ReactDOM from "react-dom";
class DoneItem extends React.Component {
    render() {
        const { item, handleTaskDelete, handleTaskEdit, handleDoneItemUpdate, handleDoneItemChange, handleCheckDoneTask } = this.props;
        return (
            <>
                <div className="item active" data-taskid={item.myTaskID}>
                    <a className="custome-check"
                        onClick={event => handleCheckDoneTask(event) }
                    >
                        <i className="fa-sharp fa-solid fa-check check-icon"></i>
                        <i className="uncheck-icon"></i>
                        <input type="checkbox"
                            
                        />
                    </a>
                    <label className="title" onDoubleClick={event => handleTaskEdit(event)}>
                        {item.title}</label>
                    <input type="text" defaultValue={item.title}
                        onKeyUp={event => handleDoneItemUpdate(event, item.myTaskID)}
                        onChange={event => handleDoneItemChange(event, item.myTaskID)}
                    />
                    <a className="remove" href="#"
                        onClick={() => handleTaskDelete(item.myTaskID)}>
                        <i className="fa-solid fa-trash"></i>
                    </a>
                </div>
            </>
        );
    }

}
export default DoneItem