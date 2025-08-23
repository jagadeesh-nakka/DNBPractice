// components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [primarySkills, setPrimarySkills] = useState([]);
  const [newPrimarySkill, setNewPrimarySkill] = useState('');
  const [selectedPrimarySkill, setSelectedPrimarySkill] = useState(null);
  const [newSecondarySkill, setNewSecondarySkill] = useState('');

  useEffect(() => {
    fetchPrimarySkills();
  }, []);

  const fetchPrimarySkills = async () => {
    try {
      const response = await fetch('/api/primary-skills');
      const data = await response.json();
      setPrimarySkills(data);
    } catch (error) {
      console.error('Error fetching primary skills:', error);
    }
  };

  const addPrimarySkill = async () => {
    try {
      await fetch('/api/primary-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newPrimarySkill }),
      });
      setNewPrimarySkill('');
      fetchPrimarySkills();
    } catch (error) {
      console.error('Error adding primary skill:', error);
    }
  };

  const addSecondarySkill = async () => {
    try {
      await fetch('/api/secondary-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: newSecondarySkill, 
          primarySkillId: selectedPrimarySkill 
        }),
      });
      setNewSecondarySkill('');
    } catch (error) {
      console.error('Error adding secondary skill:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      
      <div className="admin-section">
        <h3>Add Primary Skill</h3>
        <input
          type="text"
          value={newPrimarySkill}
          onChange={(e) => setNewPrimarySkill(e.target.value)}
          placeholder="New primary skill"
        />
        <button onClick={addPrimarySkill}>Add</button>
      </div>

      <div className="admin-section">
        <h3>Add Secondary Skill</h3>
        <select
          value={selectedPrimarySkill || ''}
          onChange={(e) => setSelectedPrimarySkill(e.target.value)}
        >
          <option value="">Select primary skill</option>
          {primarySkills.map(skill => (
            <option key={skill.id} value={skill.id}>{skill.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newSecondarySkill}
          onChange={(e) => setNewSecondarySkill(e.target.value)}
          placeholder="New secondary skill"
        />
        <button onClick={addSecondarySkill}>Add</button>
      </div>

      <div className="admin-section">
        <h3>PowerBI Integration</h3>
        <p>Connect to PowerBI using the API endpoints to visualize skill data.</p>
        <a href="/api/user-skills/export" target="_blank" rel="noopener noreferrer">
          Export Skills Data
        </a>
      </div>
    </div>
  );
};

export default AdminPanel;