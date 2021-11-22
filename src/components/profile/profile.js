import ArticleList from "../ArticleList";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  DEFAULT_AVATAR_URL,
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../../constants";
import avatar from "../../images/svg/avatar.svg";
import profileStyle from "./profile.module.css";

const EditProfileSettings = (props) => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-gear-a"></i> Изменить настройки
      </Link>
    );
  }
  return null;
};

const FollowUserButton = (props) => {
  if (props.isUser) {
    return null;
  }

  let classes = "btn btn-sm action-btn";
  if (props.user.following) {
    classes += " btn-secondary";
  } else {
    classes += " btn-outline-secondary";
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? "Отписаться от" : "Подписаться на"}{" "}
      {props.user.username}
    </button>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username),
    }),
  onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: (username) =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username),
    }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

const Profile = (props) => {
  useEffect(() => {
    props.onLoad(
      Promise.all([
        agent.Profile.get(props.match.params.username),
        agent.Articles.byAuthor(props.match.params.username),
      ])
    );

    return () => props.onUnload();
  }, []);

  const renderTabs = () => {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link active" to={`/@${props.profile.username}`}>
            Мои рецензии
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${props.profile.username}/favorites`}
          >
            Любимые рецензии
          </Link>
        </li>
      </ul>
    );
  };

  const profile = props.profile;
  if (!profile) {
    return null;
  }

  const isUser =
    props.currentUser && props.profile.username === props.currentUser.username;

  const imgAvatar =
    profile.image !== DEFAULT_AVATAR_URL ? profile.image : avatar;

  return (
    <section className={profileStyle.section}>
      <div className={profileStyle.containerAvatar}>
        <div className={profileStyle.containerAvatar}>
          <img
            src={imgAvatar}
            className={profileStyle.userAvatar}
            alt={profile.username}
          />
          <h4>{profile.username}</h4>

          <EditProfileSettings isUser={isUser} />
          <FollowUserButton
            isUser={isUser}
            user={profile}
            follow={props.onFollow}
            unfollow={props.onUnfollow}
          />
        </div>
      </div>

      <div className="container">
        <div className="articles-toggle">{renderTabs()}</div>

        <ArticleList
          pager={props.pager}
          articles={props.articles}
          articlesCount={props.articlesCount}
          state={props.currentPage}
        />
      </div>
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
