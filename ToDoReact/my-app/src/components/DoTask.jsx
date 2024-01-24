import React from "react";
import ReactDOM from "react-dom";
import DoItem from "./DoItem";
class DoTask extends React.Component {
    render() {
        const { doTasks, handleTaskDelete, handleTaskEdit,
            handleDoItemUpdate, handleDoItemChange, handleCheckDoTask,  } = this.props;
        return (
            <div>
                <fieldset>
                    <legend>Do task</legend>
                    <div className="do-task">
                        <div className="list-box">
                            {doTasks.map(item => (
                                <DoItem
                                    key={item.myTaskID}
                                    item={item}
                                    handleTaskDelete={handleTaskDelete}
                                    handleTaskEdit={handleTaskEdit}
                                    handleDoItemUpdate={handleDoItemUpdate}
                                    handleDoItemChange={handleDoItemChange}
                                    handleCheckDoTask={handleCheckDoTask}
                                />
                            ))}
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }

}
export default DoTask