import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Backlog from "./Backlog";
import { getBacklog } from "./../../actions/backlogActions";
import PropTypes from "prop-types";

class ProjectBoard extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }
  render() {
    // console.log(props);
    const { id } = this.props.match.params;
    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <Backlog />
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  project_task: state.project_task
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(ProjectBoard);
