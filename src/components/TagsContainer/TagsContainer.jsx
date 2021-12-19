import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import agent from '../../agent';
import tagsStyle from './TagsContainer.module.css';

const mapStateToProps = (state) => ({
  activeTag: state.articleList.tag,
});

const TagsContainer = ({ tags, onClickTag, activeTag }) => (
  tags.length > 0 ? (
    <div className={tagsStyle.tagList}>
      {tags.map((tag) => {
        const handleClick = (ev) => {
          ev.preventDefault();
          onClickTag(
            tag,
            (page) => agent.Articles.byTag(tag, page),
            agent.Articles.byTag(tag),
          );
        };
        return (
          <button
            type="button"
            href=""
            value={tag}
            className={
              activeTag === tag ? tagsStyle.buttonActive : tagsStyle.button
            }
            key={tag}
            onClick={handleClick}
          >
            {tag}
          </button>
        );
      })}
    </div>
  ) : null
);

export default connect(mapStateToProps)(TagsContainer);

TagsContainer.defaultProps = {
  tags: [],
};

TagsContainer.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onClickTag: PropTypes.func.isRequired,
  activeTag: PropTypes.string,
};

TagsContainer.defaultProps = {
  activeTag: null,
};
