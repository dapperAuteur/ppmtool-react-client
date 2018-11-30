import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    // console.log(this.props);
    const { project_tasks_props } = this.props;
    // console.log(project_tasks_props);
    const tasks = project_tasks_props.map(project_task => (
      <ProjectTask key={project_task.id} project_task={project_task} />
    ));

    // console.log(tasks_todo);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {tasks}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {
              // <ProjectTask />
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {
              // <ProjectTask />
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Backlog;
