// src/components/Profile.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SkillMatrix from './SkillMatrix'; // assuming you have SkillMatrix component
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [userSkills, setUserSkills] = useState(user?.skills || []);
  const [editing, setEditing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRemoveSkill = (skillId) => {
    setUserSkills(prev => prev.filter(skill => skill.id !== skillId));
  };

  const handleAddSkill = (skill) => {
    if (!userSkills.find(s => s.id === skill.id)) {
      setUserSkills(prev => [...prev, skill]);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user?.username || 'User'}'s Profile</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="profile-details">
        <h2>Personal Details</h2>
        <ul>
          <li><strong>Username:</strong> {user?.username}</li>
          <li><strong>Email:</strong> {user?.email || 'Not provided'}</li>
          <li><strong>Role:</strong> {user?.role || 'User'}</li>
        </ul>
      </div>

      <div className="profile-skills">
        <h2>Your Skills</h2>
        {userSkills.length === 0 && <p>No skills selected yet.</p>}

        {userSkills.length > 0 && (
          <div className="skills-list">
            {userSkills.map(skill => (
              <span key={skill.id} className="skill-item">
                {skill.name} ({skill.level || 'N/A'})
                <button 
                  className="remove-skill-btn" 
                  onClick={() => handleRemoveSkill(skill.id)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Optional: Add Skill Section */}
        {editing && (
          <div className="add-skill-section">
            <p>Select a skill to add:</p>
            <SkillMatrix 
              skills={user?.allSkills || []} // pass all available skills
              onSkillSelect={handleAddSkill}
              selectedSkills={userSkills.map(s => s.id)}
            />
            <button onClick={() => setEditing(false)}>Done</button>
          </div>
        )}

        <button onClick={() => setEditing(!editing)} className="edit-skills-btn">
          {editing ? 'Cancel' : 'Edit/Add Skills'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
