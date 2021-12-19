import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from '../ArticleCard/ArticleCard';
import ListPagination from '../ListPagination';
import containerStyle from './ArticlesContainer.module.css';

const ArticlesContainer = ({
  articles, pager, articlesCount, currentPage, onClickTag,
}) => {
  if (!articles) {
    return <div className={containerStyle.articlePreview}>Загрузка...</div>;
  }

  if (articles.length === 0) {
    return <div className={containerStyle.articlePreview}>Здесь пусто... пока что.</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard
          article={article}
          key={article.slug}
          onClickTag={onClickTag}
        />
      ))}

      <ListPagination
        pager={pager}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ArticlesContainer;

ArticlesContainer.defaultProps = {
  articles: null,
  currentPage: null,
  articlesCount: null,
  pager: null,
};

ArticlesContainer.propTypes = {
  articles: PropTypes.PropTypes.arrayOf(PropTypes.object),
  pager: PropTypes.func,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.number,
  onClickTag: PropTypes.func.isRequired,
};
