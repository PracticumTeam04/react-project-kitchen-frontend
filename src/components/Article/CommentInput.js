import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { ADD_COMMENT } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: '',
    };

    this.setBody = (ev) => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = (ev) => {
      ev.preventDefault();
      const payload = agent.Comments.create(this.props.slug,
        { body: this.state.body });
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Напишите комментарий..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3"
          />
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img"
            alt={this.props.currentUser.username}
          />
          <button
            className="btn btn-sm btn-primary"
            type="submit"
          >
            Опубликовать
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
