import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { DELETE_ARTICLE } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) => dispatch({ type: DELETE_ARTICLE, payload }),
});

const ArticleActions = (props) => {
  const { article } = props;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug));
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" />
          {' '}
          Изменить
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" />
          {' '}
          Удалить
        </button>

      </span>
    );
  }

  return (
    <span />
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
