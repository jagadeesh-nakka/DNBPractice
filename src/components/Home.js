// src/components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import SkillMatrix from './SkillMatrix';
import SkillForm from './SkillForm';
import '../styles/Home.css';
import '../styles/SkillMatrix.css';

const Home = ({ selectedSkills, setSelectedSkills }) => {
  const [primarySkills, setPrimarySkills] = useState([]);
  const [selectedPrimarySkill, setSelectedPrimarySkill] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leftWidth, setLeftWidth] = useState(40);
  const containerRef = useRef(null);
  const isResizing = useRef(false);

  // Fetch primary skills
  useEffect(() => {
    const fetchPrimarySkills = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/primary-skills');
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const data = await res.json();
        setPrimarySkills(data || []);
      } catch (err) {
        console.error('Error fetching primary skills:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrimarySkills();
  }, []);

  // Handle primary skill selection
  const handleSkillSelect = async (skill) => {
    try {
      const res = await fetch(`/api/secondary-skills?primarySkillId=${skill.id}`);
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const json = await res.json();
      const secondaryArray = Array.isArray(json) ? json : json.data || [];
      setSelectedPrimarySkill({ ...skill, secondarySkills: secondaryArray });
    } catch (err) {
      console.error('Error fetching secondary skills:', err);
      setSelectedPrimarySkill({ ...skill, secondarySkills: [] });
    }
  };

  const handleBack = () => setSelectedPrimarySkill(null);
  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleRemoveUserSkill = (skillId) => {
    setUserSkills((prev) => prev.filter((skill) => skill.id !== skillId));
    setSelectedSkills((prev) => prev.filter((s) => s.primarySkillId !== skillId));
    if (selectedPrimarySkill?.id === skillId) setSelectedPrimarySkill(null);
  };

  // Filter and sort primary skills
  const filteredSkills = primarySkills.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery)
  );

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    const aSelected = userSkills.some((s) => s.id === a.id) ? 1 : 0;
    const bSelected = userSkills.some((s) => s.id === b.id) ? 1 : 0;
    return bSelected - aSelected; // move selected skills to top
  });

  // Splitter handlers
  const startResize = (e) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopResize);
  };

  const onMouseMove = (e) => {
    if (!isResizing.current || !containerRef.current) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    let newLeftWidth = (e.clientX / containerWidth) * 100;
    newLeftWidth = Math.min(Math.max(newLeftWidth, 20), 80);
    setLeftWidth(newLeftWidth);
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', stopResize);
  };

  return (
    <div className="split-layout" ref={containerRef} style={{ height: '100vh' }}>
      {/* Left panel */}
      <div
        className="left-panel"
        style={{ width: `${leftWidth}%`, height: '100%', overflowY: 'auto', padding: '10px' }}
      >
        <div className="home-header">
          <h1>Skill Assessment Platform</h1>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {userSkills.length > 0 && (
          <div className="user-skills">
            <h2>Your Selected Skills</h2>
            <div className="user-skill-items">
              {userSkills.map((skill) => (
                <span key={skill.id} className="user-skill">
                  {skill.name}
                  <button onClick={() => handleRemoveUserSkill(skill.id)}>×</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {loading && <p>Loading skills...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <SkillMatrix
            skills={sortedSkills}
            onSkillSelect={handleSkillSelect}
            selectedSkillId={selectedPrimarySkill?.id}
          />
        )}
      </div>

      {/* Splitter */}
      <div className="splitter" onMouseDown={startResize}></div>

      {/* Right panel */}
      <div className="right-panel" style={{ padding: '10px' }}>
        {selectedPrimarySkill ? (
          <SkillForm
            primarySkill={selectedPrimarySkill}
            onBack={handleBack}
            onSubmit={(data) => {
              console.log('✅ Form submitted:', data);

              const selectedSkillsArray = data?.skills || [];

              // Update global selectedSkills
              setSelectedSkills((prev) => {
                const newSkills = [...prev];

                // Avoid duplicates
                if (!newSkills.some((s) => s.primarySkillId === data.primarySkillId)) {
                  newSkills.push({ primarySkillId: data.primarySkillId, skills: selectedSkillsArray });
                }
                return newSkills;
              });

              // Add primary skill to local userSkills
              if (!userSkills.find((s) => s.id === data.primarySkillId)) {
                const skillToAdd = primarySkills.find((s) => s.id === data.primarySkillId);
                if (skillToAdd) {
                  setUserSkills((prev) => [...prev, skillToAdd]);
                }
              }

              setSelectedPrimarySkill(null);
            }}
          />
        ) : (
          <div className="placeholder">
            <h2>Select a primary skill from the left to view its secondary skills.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


// base demo code 
// // src/components/Home.js
// import React, { useState, useEffect, useRef } from 'react';
// import SkillMatrix from './SkillMatrix';
// import SkillForm from './SkillForm';
// import '../styles/Home.css';
// import '../styles/SkillMatrix.css';

// const Home = () => {
//   const [primarySkills, setPrimarySkills] = useState([]);
//   const [selectedPrimarySkill, setSelectedPrimarySkill] = useState(null);
//   const [userSkills, setUserSkills] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [leftWidth, setLeftWidth] = useState(40); // initial width %
//   const containerRef = useRef(null);
//   const isResizing = useRef(false);

//   useEffect(() => {
//     // Sample primary skills
//     const sampleSkills = [
//       { id: 1, name: 'Java', level: 'Intermediate' },
//       { id: 2, name: 'Python', level: 'Intermediate' },
//       { id: 3, name: 'C', level: 'Beginner' },
//       { id: 4, name: 'C++', level: 'Intermediate' },
//       { id: 5, name: 'JavaScript', level: 'Intermediate' },
//       { id: 6, name: 'TypeScript', level: 'Beginner' },
//       { id: 7, name: 'React', level: 'Intermediate' },
//       { id: 8, name: 'Angular', level: 'Beginner' },
//       { id: 9, name: 'Vue.js', level: 'Beginner' },
//       { id: 10, name: 'Node.js', level: 'Intermediate' }
//     ];
//     setPrimarySkills(sampleSkills);
//   }, []);

//   const handleSkillSelect = (skill) => {
//     setSelectedPrimarySkill(skill);
//     if (!userSkills.find(s => s.id === skill.id)) {
//       setUserSkills(prev => [...prev, skill]);
//     }
//   };

//   const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

//   const handleRemoveUserSkill = (skillId) => {
//     setUserSkills(prev => prev.filter(skill => skill.id !== skillId));
//     if (selectedPrimarySkill?.id === skillId) setSelectedPrimarySkill(null);
//   };

//   const sortedSkills = [...primarySkills]
//     .sort((a, b) => (userSkills.find(s => s.id === b.id) ? 1 : 0) - (userSkills.find(s => s.id === a.id) ? 1 : 0))
//     .filter(skill => skill.name.toLowerCase().includes(searchQuery));

//   // Splitter handlers
//   const startResize = (e) => {
//     e.preventDefault();
//     isResizing.current = true;
//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', stopResize);
//   };

//   const onMouseMove = (e) => {
//     if (!isResizing.current || !containerRef.current) return;

//     const containerWidth = containerRef.current.getBoundingClientRect().width;
//     let newLeftWidth = (e.clientX / containerWidth) * 100;

//     if (newLeftWidth < 20) newLeftWidth = 20;
//     if (newLeftWidth > 80) newLeftWidth = 80;

//     setLeftWidth(newLeftWidth);
//   };

//   const stopResize = () => {
//     isResizing.current = false;
//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', stopResize);
//   };

//   return (
//     <div className="split-layout" ref={containerRef} style={{ height: '100vh' }}>
//       {/* Left panel */}
//       <div className="left-panel" style={{ width: `${leftWidth}%` }}>
//         <div className="home-header">
//           <h1>Skill Assessment Platform</h1>
//         </div>

//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search skills..."
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>

//         {userSkills.length > 0 && (
//           <div className="user-skills">
//             <h2>Your Selected Skills</h2>
//             <div className="user-skill-items">
//               {userSkills.map(skill => (
//                 <span key={skill.id} className="user-skill">
//                   {skill.name}
//                   <button onClick={() => handleRemoveUserSkill(skill.id)}>×</button>
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         <SkillMatrix
//           skills={sortedSkills}
//           onSkillSelect={handleSkillSelect}
//           selectedSkills={userSkills.map(s => s.id)}
//         />
//       </div>

//       {/* Splitter */}
//       <div className="splitter" onMouseDown={startResize}></div>

//       {/* Right panel */}
//       <div className="right-panel">
//         {selectedPrimarySkill ? (
//           <SkillForm
//             primarySkill={selectedPrimarySkill}
//             onBack={() => setSelectedPrimarySkill(null)}
//             onSubmit={(data) => console.log('Form submitted:', data)}
//           />
//         ) : (
//           <div className="placeholder">
//             <h2>Select a skill from the left to configure its subskills.</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
