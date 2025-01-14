import React from 'react';
import { connect } from 'react-redux';
import Banner from '../Banner/Banner';
import MainView from './MainView';
import TagsWidget from '../TagsWidget/TagsWidget';
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from '../../constants/actionTypes';

const { Promise } = global;
const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) => dispatch({
    type: APPLY_TAG_FILTER, tag, pager, payload,
  }),
  onLoad: (tab, pager, payload) => dispatch({
    type: HOME_PAGE_LOADED, tab, pager, payload,
  }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token
      ? agent.Articles.feed
      : agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />
        <div className="container page">

          <div className="row">
            <MainView onClickTag={this.props.onClickTag}/>
                <TagsWidget
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag}
                />
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
