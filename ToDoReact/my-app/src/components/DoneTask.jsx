import React from "react";
import ReactDOM from "react-dom";
import DoneItem from "./DoneItem";
class DoneTask extends React.Component {
    render() {
        const { doneTasks, handleTaskDelete, handleTaskEdit, handleDoneItemUpdate, handleDoneItemChange, handleCheckDoneTask } = this.props;
        return (
            <div>
            <fieldset>
                <legend>
                    Done Task
                </legend>
                <div className="done-task">
                    <div className="list-box">
                        {doneTasks.map(item => (
                            <DoneItem
                                key={item.myTaskID}
                                item={item}
                                handleTaskDelete={handleTaskDelete}
                                handleTaskEdit={handleTaskEdit}
                                handleDoneItemUpdate={handleDoneItemUpdate}
                                handleDoneItemChange={handleDoneItemChange}
                                handleCheckDoneTask={handleCheckDoneTask}
                            />
                        ))}
                    </div>
                </div>
                </fieldset>
            </div>
        );
    }

}
export default DoneTask