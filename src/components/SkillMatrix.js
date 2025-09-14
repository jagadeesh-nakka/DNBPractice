// src/components/SkillMatrix.js
import React from 'react';
import '../styles/SkillMatrix.css';

function SkillMatrix({ skills, onSkillSelect, selectedSkillId }) {
  if (!skills || skills.length === 0) return <p>No skills available</p>;

  return (
    <div className="skill-matrix">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className={`skill-card ${selectedSkillId === skill.id ? 'selected' : ''}`}
          onClick={() => onSkillSelect(skill)}
        >
          <h3>{skill.name}</h3>
          <p>{skill.description || 'No description available'}</p>
        </div>
      ))}
    </div>
  );
}

export default SkillMatrix;
  // ✅ must be default export
// */
// // src/components/SkillMatrix.js

// import '../styles/SkillMatrix.css';

// const SkillMatrix = ({ skills, onSkillSelect }) => {
//   return (
//     <div className="skill-matrix">
//       {skills.map(skill => (
//         <div key={skill.id} className="skill-card" onClick={() => onSkillSelect(skill)}>
//           <h3>{skill.name}</h3>
//           <p>{skill.level}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SkillMatrix;


// src/components/SkillMatrix.js
// import React from 'react';
// import '../styles/SkillMatrix.css';

// const SkillMatrix = ({ skills, onSkillSelect, selectedSkills = [] }) => {
//   return (
//     <div className="skill-matrix">
//       {skills.map(skill => (
//         <div
//           key={skill.id}
//           className={`skill-card ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
//           onClick={() => onSkillSelect(skill)}
//         >
//           {skill.name}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SkillMatrix;
