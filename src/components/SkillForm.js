// src/components/SkillForm.js
import React, { useState, useEffect } from 'react';
import '../styles/SkillForm.css';

const SkillForm = ({ primarySkill, onBack, onSubmit }) => {
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});

  useEffect(() => {
    if (!primarySkill?.id) return;

    const fetchSecondarySkills = async () => {
      try {
        const response = await fetch(`/api/secondary-skills?primarySkillId=${primarySkill.id}`);
        const result = await response.json();
        const skillsArray = Array.isArray(result) ? result : result?.data || [];
        setSecondarySkills(skillsArray);
        setSelectedSkills({});
      } catch (error) {
        console.error('Error fetching secondary skills:', error);
        setSecondarySkills([]);
      }
    };

    fetchSecondarySkills();
  }, [primarySkill]);

  const handleSkillChange = (skillId, isChecked) => {
    setSelectedSkills(prev => ({
      ...prev,
      [skillId]: isChecked ? { expertise: 'BEGINNER', years: 0 } : null
    }));
  };

  const handleExpertiseChange = (skillId, expertise) => {
    setSelectedSkills(prev => ({
      ...prev,
      [skillId]: { ...prev[skillId], expertise }
    }));
  };

  const handleYearsChange = (skillId, years) => {
    setSelectedSkills(prev => ({
      ...prev,
      [skillId]: { ...prev[skillId], years: parseInt(years) || 0 }
    }));
  };

  const handleSubmit = () => {
    const skillsData = Object.entries(selectedSkills)
      .filter(([_, data]) => data !== null)
      .map(([skillId, data]) => ({
        secondarySkillId: parseInt(skillId),
        expertiseLevel: data?.expertise || 'BEGINNER',
        yearsOfExperience: data?.years ?? 0
      }));

    onSubmit({ primarySkillId: primarySkill.id, skills: skillsData });
  };

  if (!primarySkill) return <div>Loading...</div>;

  return (
    <div className="skill-form">
      <h2>Select skills for {primarySkill.name}</h2>

      {secondarySkills.length > 0 ? (
        <div className="secondary-skills">
          {secondarySkills.map(skill => (
            <div key={skill.id} className="secondary-skill">
              <label>
                <input
                  type="checkbox"
                  checked={!!selectedSkills[skill.id]}
                  onChange={(e) => handleSkillChange(skill.id, e.target.checked)}
                />
                {skill?.name || 'Unnamed Skill'}
              </label>

              {selectedSkills[skill.id] && (
                <div className="skill-details">
                  <select
                    value={selectedSkills[skill.id]?.expertise || 'BEGINNER'}
                    onChange={(e) => handleExpertiseChange(skill.id, e.target.value)}
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="EXPERT">Expert</option>
                  </select>

                  <input
                    type="number"
                    min="0"
                    placeholder="Years of experience"
                    value={selectedSkills[skill.id]?.years || 0}
                    onChange={(e) => handleYearsChange(skill.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No secondary skills available for this primary skill.</p>
      )}

      <div className="form-actions">
        <button onClick={onBack}>Back</button>
        <button onClick={handleSubmit}>Done</button>
      </div>
    </div>
  );
};

export default SkillForm;
