import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = ({ email }) => {
  const [form, setForm] = useState({
    name: "",
    skillsOffered: "",
    skillsWanted: "",
    availability: "",
    portfolioLink: ""
  });

  useEffect(() => {
    // Get profile data if exists
    axios.get(`http://localhost:5000/api/profile/${email}`)
      .then(res => setForm(res.data))
      .catch(err => console.log("New user or error:", err.message));
  }, [email]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/profile", { ...form, email });
      alert("Profile saved!");
    } catch (err) {
      alert("Failed to save profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto shadow-md border rounded">
      <h2 className="text-xl font-semibold mb-4">SkillSwap Profile</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="block w-full mb-3 p-2 border" />
      <input name="skillsOffered" placeholder="Skills Offered (comma separated)" value={form.skillsOffered} onChange={handleChange} className="block w-full mb-3 p-2 border" />
      <input name="skillsWanted" placeholder="Skills Wanted" value={form.skillsWanted} onChange={handleChange} className="block w-full mb-3 p-2 border" />
      <input name="availability" placeholder="Availability" value={form.availability} onChange={handleChange} className="block w-full mb-3 p-2 border" />
      <input name="portfolioLink" placeholder="Portfolio Link" value={form.portfolioLink} onChange={handleChange} className="block w-full mb-4 p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Profile</button>
    </form>
  );
};

export default ProfileForm;
