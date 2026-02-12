import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const email = "test@example.com"; // will be dynamic later

  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    contact: email,
    skillsOffered: [],
    skillsWanted: [],
    availability: '',
    portfolioLink: '',
    skillVerificationStatus: 'Pending',
    profilePic: ''
  });

  const [preview, setPreview] = useState(null);
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/userprofile/${email}`)
      .then(res => {
        setProfile(res.data);
        setPreview(res.data.profilePic);
        
      })
      .catch(err => console.log("No existing profile"));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(prev => ({ ...prev, profilePic: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/profile', {
      ...profile,
      email
    });
    console.log("✅ Response:", res.data);
    alert("✅ Profile saved!");
  } catch (err) {
    console.error("❌ Error submitting:", err.response || err.message);
    alert("❌ Failed to save profile");
  }
};


  const addSkill = (type) => {
    if (type === 'offered' && offeredSkill) {
      setProfile(prev => ({ ...prev, skillsOffered: [...prev.skillsOffered, offeredSkill] }));
      setOfferedSkill('');
    } else if (type === 'wanted' && wantedSkill) {
      setProfile(prev => ({ ...prev, skillsWanted: [...prev.skillsWanted, wantedSkill] }));
      setWantedSkill('');
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>👤 Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} required />
          </label>

          <label>Bio:
            <textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
          </label>

          <label>Contact:
            <input type="text" value={profile.contact} readOnly />
          </label>

          <label>Profile Picture:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          {preview && <img src={preview} alt="preview" style={{ width: 100, borderRadius: 10, marginTop: 10 }} />}

          <label>Skills Offered:
            <input type="text" value={offeredSkill} onChange={e => setOfferedSkill(e.target.value)} />
            <button type="button" onClick={() => addSkill('offered')}>Add</button>
            <ul>{profile.skillsOffered.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </label>

          <label>Skills Wanted:
            <input type="text" value={wantedSkill} onChange={e => setWantedSkill(e.target.value)} />
            <button type="button" onClick={() => addSkill('wanted')}>Add</button>
            <ul>{profile.skillsWanted.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </label>

          <label>Availability Schedule:
            <textarea value={profile.availability} onChange={e => setProfile({ ...profile, availability: e.target.value })} />
          </label>

          <label>Portfolio Link:
            <input type="url" value={profile.portfolioLink} onChange={e => setProfile({ ...profile, portfolioLink: e.target.value })} />
          </label>

          <label>Skill Verification Status:
            <select value={profile.skillVerificationStatus} onChange={e => setProfile({ ...profile, skillVerificationStatus: e.target.value })}>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Not Verified">Not Verified</option>
            </select>
          </label>

          <button type="submit">💾 Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
