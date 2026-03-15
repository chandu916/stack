import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import useSafeCallback from "../../utils/useSafeCallback";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import LoginHistory from "./LoginHistory";
import "./UsersProfile.css";

const UserProfile = ({ slideIn, handleSlideIn, onClose, isDarkTheme, toggleTheme }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);

  const safeSetEditProfile = useSafeCallback(() => setSwitch('editProfile'), 'UserProfile Edit Profile');
  const safeSetProfileBio = useSafeCallback(() => setSwitch('profileBio'), 'UserProfile Profile Bio');
  const safeSetLoginHistory = useSafeCallback(() => setSwitch('loginHistory'), 'UserProfile Login History');
  const safeSetTheme = useSafeCallback(() => {
    toggleTheme();
    setSwitch('theme');
  }, 'UserProfile Theme');

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} onClose={onClose} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name ? currentProfile.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name || 'Unknown'}</h1>
                <p>
                  Joined {currentProfile?.joinedOn ? moment(currentProfile.joinedOn).format('MMM-D-YYYY') : 'Unknown'}
                </p>
              </div>
            </div>
            {currentUser?.result?._id === id && (
              <button type="button" onClick={safeSetEditProfile} className="edit-profile-btn">
                <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                Edit Profile
              </button>
            )}
          </div>

          <div className="" style={{ marginTop: '10px' }}>
            {currentUser?.result?._id === id && (
              <button onClick={safeSetProfileBio} className="nav-items nav-btn">
                Profile
              </button>
            )}
            {currentUser?.result?._id === id && (
              <button onClick={safeSetLoginHistory} className="nav-items nav-btn">
                Logins
              </button>
            )}
            {currentUser?.result?._id === id && (
              <button onClick={safeSetTheme} className="nav-items nav-btn">
                Theme: {isDarkTheme ? 'Dark' : 'Light'}
              </button>
            )}
          </div>

          <>
            {Switch === 'editProfile' && <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />}
            {Switch === 'profileBio' && <ProfileBio currentProfile={currentProfile} setSwitch={setSwitch} />}
            {Switch === 'loginHistory' && <LoginHistory />}
            {Switch === 'theme' && (
              <div className="theme-info" style={{ marginTop: '16px', color: isDarkTheme ? 'white' : 'black' }}>
                Theme switched to {isDarkTheme ? 'Dark' : 'Light'} mode.
              </div>
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;