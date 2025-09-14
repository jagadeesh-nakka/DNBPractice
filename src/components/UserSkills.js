// src/components/UserSkills.js
import React, { useState } from 'react';

const UserSkills = ({ userId }) => {
  const [skills, setSkills] = useState(null);
  const [message, setMessage] = useState('');

  const fetchSkills = async () => {
    try {
      const response = await fetch(`/api/user-skills?userId=${userId}`);
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        setSkills(result.data);
        setMessage('');
      } else {
        setSkills([]);
        setMessage('No skills found for this user.');
      }
    } catch (error) {
      console.error('Error fetching user skills:', error);
      setSkills([]);
      setMessage('Error fetching user skills.');
    }
  };

  return (
    <div>
      <button onClick={fetchSkills}>Load My Skills</button>

      {skills && skills.length > 0 && (
        <ul>
          {skills.map(skill => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default UserSkills;
