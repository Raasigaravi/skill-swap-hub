// DashboardProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardProfile = ({ email }) => {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/userprofile/${encodeURIComponent(email)}`)
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, [email]);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={profile.profilePic || 'https://via.placeholder.com/40'}
        alt="Profile"
        style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', border: '2px solid #3E54AC' }}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 5px)',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 15,
          width: 250,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}>
          <p><strong>{profile.name}</strong></p>
          <p>{profile.email}</p>
          <p><strong>Skills Offered:</strong> {profile.skillsOffered.join(', ')}</p>
          <p><strong>Skills Wanted:</strong> {profile.skillsWanted.join(', ')}</p>
          <p><strong>Availability:</strong> {profile.availability}</p>
          <a href={profile.portfolioLink} target="_blank" rel="noreferrer">Portfolio Link</a>
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;
