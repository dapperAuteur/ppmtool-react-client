import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Backlog from "./Backlog";
import { getBacklog } from "./../../actions/backlogActions";
import PropTypes from "prop-types";

class ProjectBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }
  render() {
    const { project_tasks } = this.props.backlog;
    const { errors } = this.state;
    // console.log(project_tasks);
    let BoardContent;
    const boardAlgorithm = (errors, project_tasks) => {
      if (project_tasks.length < 1) {
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project Tasks on this board
            </div>
          );
        }
      } else {
        return <Backlog project_tasks_props={project_tasks} />;
      }
    };
    const { id } = this.props.match.params;

    BoardContent = boardAlgorithm(errors, project_tasks);
    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors,
  project_task: state.project_task
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(ProjectBoard);
