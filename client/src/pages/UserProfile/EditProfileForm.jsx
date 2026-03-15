import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState(currentUser?.result?.name);
  const [email, setEmail] = useState(currentUser?.result?.email);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [tags, setTags] = useState(currentUser?.result?.tags || []);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim();
    const trimmedAbout = (about || '').trim();
    const tagArray = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : (tags || '').split(/[ ,]+/).map((t) => t.trim()).filter(Boolean);

    if (!trimmedName) {
      setError('Name is required.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Valid email is required.');
      return;
    }
    if (tagArray.length === 0) {
      setError('Please add at least one tag.');
      return;
    }

    try {
      await dispatch(updateProfile(currentUser?.result?._id, {
        name: trimmedName,
        email: trimmedEmail,
        about: trimmedAbout,
        tags: tagArray,
      }));
      setSwitch(false);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not update profile.');
    }
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          <h3>Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;