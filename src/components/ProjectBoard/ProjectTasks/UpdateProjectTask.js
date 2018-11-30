import React, { Component } from "react";
import {
  getProjectTask,
  addProjectTask
} from "./../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params);
    const { backlog_id, pt_id } = this.props.match.params;
    this.state = {
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: 0,
      dueDate: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.projectTask) {
      console.log(nextProps.projectTask);
      const {
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate
      } = nextProps.projectTask;
      console.log(summary, status);
      this.setState({
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate
      });
    }
  }

  componentDidMount() {
    console.log(this.state);
    console.log(this.props);
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    // this.setState({
    //   summary: this.state.summary,
    //   acceptanceCriteria: this.state.acceptanceCriteria,
    //   status: this.state.status,
    //   priority: this.state.priority,
    //   dueDate: this.state.dueDate
    // });
    // console.log(this.state);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedProjectTask = {
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate
    };
    console.log(updatedProjectTask);
    this.props.addProjectTask(
      this.state.projectIdentifier,
      updatedProjectTask,
      this.props.history
    );
  }

  render() {
    const { backlog_id } = this.props.match.params;
    const { summary } = this.state.errors;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${backlog_id}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {summary && (
                    <div className="invalid-feedback"> {summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getProjectTask: PropTypes.func.isRequired,
  projectTask: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  projectTask: state.backlog.project_task
});

export default connect(
  mapStateToProps,
  { getProjectTask, addProjectTask }
)(UpdateProjectTask);
