import React, { Component } from "react";
import Backlog from "./Backlog";

class ProjectBoard extends Component {
  render() {
    return (
      <div class="container">
        <a href="#" class="btn btn-primary mb-3">
          <i class="fas fa-plus-circle"> Create Project Task</i>
        </a>
        <br />
        <hr />
        <Backlog />
      </div>
    );
  }
}

export default ProjectBoard;
