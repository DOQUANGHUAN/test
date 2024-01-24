import React from "react";
import ReactDOM from "react-dom";
class DoItem extends React.Component {
    render() {
        const { item, handleTaskDelete, handleTaskEdit, handleDoItemUpdate, handleDoItemChange, handleCheckDoTask} = this.props;
        return (
            <div>
                <div className="item" data-taskid={item.myTaskID}>
                    <a className="custome-check "
                        onClick={(event) => handleCheckDoTask(event)}
                    >
                        <i className="fa-sharp fa-solid fa-check check-icon"></i>
                        <i className="uncheck-icon"></i>
                        <input type="checkbox"

                        />
                    </a>
                    <label className="title" onDoubleClick={event => handleTaskEdit(event)}>
                        {item.title}</label>
                    <input type="text" defaultValue={item.title}
                        onKeyUp={event => handleDoItemUpdate(event, item.myTaskID)}
                        onChange={event => handleDoItemChange(event, item.myTaskID)}
                    />
                    <a className="remove" href="#"
                        onClick={() => handleTaskDelete(item.myTaskID)}>
                        <i className="fa-solid fa-trash"></i>
                    </a>
                </div>
            </div>

        );
    }

}
export default DoItem