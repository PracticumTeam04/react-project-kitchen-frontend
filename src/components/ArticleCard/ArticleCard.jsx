import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
} from '../../constants/actionTypes';
import styles from './ArticleCard.module.css';
import imagePath from '../../images/article-card-placeholder.jpg';
import { articlePropTypes } from '../../utils/prop-types';
import TagsContainer from '../TagsContainer/TagsContainer';
import LikeButton from '../LikeButton/LikeButton';

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug),
  }),
  unfavorite: (slug) => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug),
  }),
});


const ArticleCard = ({ article, onClickTag, ...props }) => {
  const handleClick = (ev) => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <article className={styles.container}>
      <div className={styles.imageWrap}>
        <img src={imagePath} className={styles.image} alt={article.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <Link to={`/@${article.author.username}`}>
            <img
              className={styles.metaImg}
              src={article.author.image}
              alt={article.author.username}
            />
          </Link>

          <div className={styles.info}>
            <Link className={styles.author} to={`/@${article.author.username}`}>
              {article.author.username}
            </Link>
            <span className={styles.date}>
              {new Date(article.createdAt)
                .toLocaleString('ru', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </span>
          </div>
          <LikeButton
            count={article.favoritesCount}
            isFavorited={article.favorited}
            onClick={handleClick}
          />
        </div>

        <div className={styles.preview}>
          <h1 className={styles.title}>
            {article.title.length > 35
              ? `${article.title.substring(0, 35)}...`
              : article.title}
          </h1>
          <p className={styles.text}>
            {article.body.length > 190
              ? `${article.body.substring(0, 190)}...`
              : article.body}
          </p>
        </div>
        <div className={styles.tagsWrap}>
          <Link to={`/article/${article.slug}`} className={styles.readMore}>
            <span>Читать</span>
          </Link>
          <TagsContainer
            tags={article.tagList}
            onClickTag={onClickTag}
          />
        </div>
      </div>
    </article>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleCard);

ArticleCard.propTypes = {
  article: articlePropTypes.isRequired,
  unfavorite: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  onClickTag: PropTypes.func.isRequired,
};
