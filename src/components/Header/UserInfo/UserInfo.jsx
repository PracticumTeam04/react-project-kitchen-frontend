import React from 'react';
import PropTypes from 'prop-types';
import LoggedInView from './LoggedInView/LoggedInView';
import LoggedOutView from './LoggedOutView/LoggedOutView';

const UserInfo = ({ currentUser }) => (
  currentUser ? <LoggedInView username={currentUser.username} />
    : <LoggedOutView />
);
export default UserInfo;
UserInfo.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
