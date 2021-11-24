import { Link } from 'react-router-dom';
import React from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentContainer = (props) => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors={props.errors} />
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    );
  }
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Войти</Link>
          &nbsp;или&nbsp;
        <Link to="/register">зарегистрироваться</Link>
          &nbsp;и оставить комментарий.
      </p>

      <CommentList
        comments={props.comments}
        slug={props.slug}
        currentUser={props.currentUser}
      />
    </div>
  );
};

export default CommentContainer;
