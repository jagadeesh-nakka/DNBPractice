// components/SkillForm.js
/*import React, { useState, useEffect } from 'react';

const SkillForm = ({ primarySkill, onBack, onSubmit }) => {
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});

  useEffect(() => {
    // Fetch secondary skills for the selected primary skill
    const fetchSecondarySkills = async () => {
      try {
        const response = await fetch(`/api/secondary-skills?primarySkillId=${primarySkill.id}`);
        const data = await response.json();
        setSecondarySkills(data);
      } catch (error) {
        console.error('Error fetching secondary skills:', error);
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
      [skillId]: { ...prev[skillId], years: parseInt(years) }
    }));
  };

  const handleSubmit = () => {
    const skillsData = Object.entries(selectedSkills)
      .filter(([_, data]) => data !== null)
      .map(([skillId, data]) => ({
        secondarySkillId: parseInt(skillId),
        expertiseLevel: data.expertise,
        yearsOfExperience: data.years
      }));
    
    onSubmit({
      primarySkillId: primarySkill.id,
      skills: skillsData
    });
  };

  return (
    <div className="skill-form">
      <h2>Select skills for {primarySkill.name}</h2>
      <div className="secondary-skills">
        {secondarySkills.map(skill => (
          <div key={skill.id} className="secondary-skill">
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleSkillChange(skill.id, e.target.checked)}
              />
              {skill.name}
            </label>
            {selectedSkills[skill.id] && (
              <div className="skill-details">
                <select
                  value={selectedSkills[skill.id].expertise}
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
                  value={selectedSkills[skill.id].years}
                  onChange={(e) => handleYearsChange(skill.id, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="form-actions">
        <button onClick={onBack}>Back</button>
        <button onClick={handleSubmit}>Done</button>
      </div>
    </div>
  );
};

export default SkillForm;*/
import React, { useState, useEffect } from 'react';
import '../styles/SkillForm.css';

const SkillForm = ({ primarySkill, onBack, onSubmit }) => {
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const dummySecondarySkills = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `${primarySkill.name} - Subskill ${i + 1}`
    }));
    setSecondarySkills(dummySecondarySkills);
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
      [skillId]: { ...prev[skillId], years: parseInt(years) }
    }));
  };

  const handleSubmit = () => {
    const skillsData = Object.entries(selectedSkills)
      .filter(([_, data]) => data !== null)
      .map(([skillId, data]) => ({
        secondarySkillId: parseInt(skillId),
        expertiseLevel: data.expertise,
        yearsOfExperience: data.years
      }));
    onSubmit({
      primarySkillId: primarySkill.id,
      skills: skillsData
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Sort skills: selected first
  const sortedSkills = [...secondarySkills].sort((a, b) => {
    const aSelected = selectedSkills[a.id] ? 1 : 0;
    const bSelected = selectedSkills[b.id] ? 1 : 0;
    return bSelected - aSelected; // selected first
  }).filter(skill => skill.name.toLowerCase().includes(searchQuery));

  const selectedSkillsList = secondarySkills.filter(skill => selectedSkills[skill.id]);

  return (
    <div className="skill-form">
      <h2>Select skills for {primarySkill.name}</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search secondary skills..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Selected Skills Display */}
      {selectedSkillsList.length > 0 && (
        <div className="selected-skills">
          <h3>Selected Skills:</h3>
          <div className="selected-skill-items">
            {selectedSkillsList.map(skill => (
              <span key={skill.id} className="selected-skill">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Secondary Skills */}
      <div className="secondary-skills">
        {sortedSkills.map(skill => (
          <div key={skill.id} className="secondary-skill">
            <label>
              <input
                type="checkbox"
                checked={!!selectedSkills[skill.id]}
                onChange={(e) => handleSkillChange(skill.id, e.target.checked)}
              />
              {skill.name}
            </label>
            {selectedSkills[skill.id] && (
              <div className="skill-details">
                <select
                  value={selectedSkills[skill.id].expertise}
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
                  value={selectedSkills[skill.id].years}
                  onChange={(e) => handleYearsChange(skill.id, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button onClick={onBack}>Back</button>
        <button onClick={handleSubmit}>Done</button>
      </div>
    </div>
  );
};

export default SkillForm;
