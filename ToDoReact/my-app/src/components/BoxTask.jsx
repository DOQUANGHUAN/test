import React from "react";
import ReactDOM from "react-dom";
import InputAddTask from "./InputAddTask";
import DoTask from "./DoTask";
import DoneTask from "./DoneTask";
class BoxTask extends React.Component {



    render() {
        const { doTasks, doneTasks, handleTaskAdd, handleTaskDelete,
            handleTaskEdit, handleDoItemUpdate, handleDoItemChange, handleDoneItemUpdate,
            handleDoneItemChange, handleCheckDoTask, handleCheckDoneTask  } = this.props;
        return (
            //Cách 1
            //<div>
            //    <InputAddTask />
            //    <DoTask />
            //    <DoneTask />
            //</div>
            //cách 2 ẨN div ảo tạo ra khi dùng div để gom lại thành 1 khối duy nhất về sau dùng cách 2 ko dùng c1
            <React.Fragment>
                <InputAddTask
                    handleTaskAdd={handleTaskAdd}
                />
                <DoTask
                    doTasks={doTasks}
                    handleTaskDelete={handleTaskDelete}
                    handleTaskEdit={handleTaskEdit}
                    handleDoItemUpdate={handleDoItemUpdate}
                    handleDoItemChange={handleDoItemChange}
                    handleCheckDoTask={handleCheckDoTask}
                />
                <DoneTask doneTasks={doneTasks}
                    handleTaskDelete={handleTaskDelete}
                    handleTaskEdit={handleTaskEdit}
                    handleDoneItemUpdate={handleDoneItemUpdate}
                    handleDoneItemChange={handleDoneItemChange}
                    handleCheckDoneTask={handleCheckDoneTask}
                />
            </React.Fragment>
        );
    }

}
export default BoxTask;