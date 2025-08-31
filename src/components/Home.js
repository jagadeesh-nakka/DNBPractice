// // src/components/Home.js

// import React, { useState, useEffect } from 'react';
// import SkillMatrix from './SkillMatrix';
// import SkillForm from './SkillForm';
// import '../styles/Home.css';
// import '../styles/SkillMatrix.css';

// const Home = () => {
//   const [primarySkills, setPrimarySkills] = useState([]);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [userSkills, setUserSkills] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Sample skills for testing
//     const sampleSkills = [
//   { id: 1, name: 'Java', level: 'Intermediate' },
//   { id: 2, name: 'Python', level: 'Intermediate' },
//   { id: 3, name: 'C', level: 'Beginner' },
//   { id: 4, name: 'C++', level: 'Intermediate' },
//   { id: 5, name: 'JavaScript', level: 'Intermediate' },
//   { id: 6, name: 'TypeScript', level: 'Beginner' },
//   { id: 7, name: 'React', level: 'Intermediate' },
//   { id: 8, name: 'Angular', level: 'Beginner' },
//   { id: 9, name: 'Vue.js', level: 'Beginner' },
//   { id: 10, name: 'Node.js', level: 'Intermediate' },
//   { id: 11, name: 'Express.js', level: 'Beginner' },
//   { id: 12, name: 'Spring Boot', level: 'Intermediate' },
//   { id: 13, name: 'Django', level: 'Intermediate' },
//   { id: 14, name: 'Flask', level: 'Beginner' },
//   { id: 15, name: 'Ruby on Rails', level: 'Beginner' },
//   { id: 16, name: 'PHP', level: 'Beginner' },
//   { id: 17, name: 'Laravel', level: 'Beginner' },
//   { id: 18, name: 'SQL', level: 'Intermediate' },
//   { id: 19, name: 'MySQL', level: 'Intermediate' },
//   { id: 20, name: 'PostgreSQL', level: 'Intermediate' },
//   { id: 21, name: 'MongoDB', level: 'Intermediate' },
//   { id: 22, name: 'Redis', level: 'Beginner' },
//   { id: 23, name: 'Oracle DB', level: 'Beginner' },
//   { id: 24, name: 'Docker', level: 'Intermediate' },
//   { id: 25, name: 'Kubernetes', level: 'Beginner' },
//   { id: 26, name: 'AWS', level: 'Intermediate' },
//   { id: 27, name: 'Azure', level: 'Beginner' },
//   { id: 28, name: 'GCP', level: 'Beginner' },
//   { id: 29, name: 'Terraform', level: 'Beginner' },
//   { id: 30, name: 'CI/CD', level: 'Intermediate' },
//   { id: 31, name: 'Jenkins', level: 'Intermediate' },
//   { id: 32, name: 'Git', level: 'Intermediate' },
//   { id: 33, name: 'GitHub', level: 'Intermediate' },
//   { id: 34, name: 'GitLab', level: 'Beginner' },
//   { id: 35, name: 'Linux', level: 'Intermediate' },
//   { id: 36, name: 'Bash Scripting', level: 'Beginner' },
//   { id: 37, name: 'PowerShell', level: 'Beginner' },
//   { id: 38, name: 'HTML', level: 'Intermediate' },
//   { id: 39, name: 'CSS', level: 'Intermediate' },
//   { id: 40, name: 'SASS', level: 'Beginner' },
//   { id: 41, name: 'Bootstrap', level: 'Intermediate' },
//   { id: 42, name: 'Material-UI', level: 'Beginner' },
//   { id: 43, name: 'REST API', level: 'Intermediate' },
//   { id: 44, name: 'GraphQL', level: 'Beginner' },
//   { id: 45, name: 'WebSockets', level: 'Beginner' },
//   { id: 46, name: 'SOAP', level: 'Beginner' },
//   { id: 47, name: 'Microservices', level: 'Intermediate' },
//   { id: 48, name: 'Event-Driven Architecture', level: 'Beginner' },
//   { id: 49, name: 'RabbitMQ', level: 'Beginner' },
//   { id: 50, name: 'Kafka', level: 'Beginner' },
//   { id: 51, name: 'Machine Learning', level: 'Intermediate' },
//   { id: 52, name: 'Deep Learning', level: 'Beginner' },
//   { id: 53, name: 'TensorFlow', level: 'Beginner' },
//   { id: 54, name: 'PyTorch', level: 'Beginner' },
//   { id: 55, name: 'NLP', level: 'Beginner' },
//   { id: 56, name: 'Computer Vision', level: 'Beginner' },
//   { id: 57, name: 'OpenCV', level: 'Beginner' },
//   { id: 58, name: 'Pandas', level: 'Intermediate' },
//   { id: 59, name: 'NumPy', level: 'Intermediate' },
//   { id: 60, name: 'Matplotlib', level: 'Beginner' },
//   { id: 61, name: 'Seaborn', level: 'Beginner' },
//   { id: 62, name: 'Scikit-Learn', level: 'Intermediate' },
//   { id: 63, name: 'Data Analysis', level: 'Intermediate' },
//   { id: 64, name: 'Data Visualization', level: 'Intermediate' },
//   { id: 65, name: 'Agile', level: 'Intermediate' },
//   { id: 66, name: 'Scrum', level: 'Intermediate' },
//   { id: 67, name: 'Kanban', level: 'Beginner' },
//   { id: 68, name: 'JIRA', level: 'Intermediate' },
//   { id: 69, name: 'Confluence', level: 'Beginner' },
//   { id: 70, name: 'Slack', level: 'Beginner' },
//   { id: 71, name: 'REST Assured', level: 'Beginner' },
//   { id: 72, name: 'Postman', level: 'Intermediate' },
//   { id: 73, name: 'Cypress', level: 'Beginner' },
//   { id: 74, name: 'Selenium', level: 'Intermediate' },
//   { id: 75, name: 'JUnit', level: 'Intermediate' },
//   { id: 76, name: 'Mockito', level: 'Beginner' },
//   { id: 77, name: 'TestNG', level: 'Beginner' },
//   { id: 78, name: 'Unit Testing', level: 'Intermediate' },
//   { id: 79, name: 'Integration Testing', level: 'Beginner' },
//   { id: 80, name: 'UI Testing', level: 'Beginner' },
//   { id: 81, name: 'REST API Testing', level: 'Intermediate' },
//   { id: 82, name: 'AWS Lambda', level: 'Beginner' },
//   { id: 83, name: 'AWS S3', level: 'Intermediate' },
//   { id: 84, name: 'AWS EC2', level: 'Intermediate' },
//   { id: 85, name: 'AWS RDS', level: 'Beginner' },
//   { id: 86, name: 'Docker Compose', level: 'Beginner' },
//   { id: 87, name: 'ElasticSearch', level: 'Beginner' },
//   { id: 88, name: 'Kibana', level: 'Beginner' },
//   { id: 89, name: 'Logstash', level: 'Beginner' },
//   { id: 90, name: 'Prometheus', level: 'Beginner' },
//   { id: 91, name: 'Grafana', level: 'Beginner' },
//   { id: 92, name: 'Kafka Streams', level: 'Beginner' },
//   { id: 93, name: 'Redis Pub/Sub', level: 'Beginner' },
//   { id: 94, name: 'GoLang', level: 'Beginner' },
//   { id: 95, name: 'Rust', level: 'Beginner' },
//   { id: 96, name: 'Scala', level: 'Beginner' },
//   { id: 97, name: 'Hadoop', level: 'Beginner' },
//   { id: 98, name: 'Spark', level: 'Beginner' },
//   { id: 99, name: 'Flink', level: 'Beginner' },
//   { id: 100, name: 'BigQuery', level: 'Beginner' },
//   { id: 101, name: 'Data Warehouse', level: 'Beginner' },
//   { id: 102, name: 'Tableau', level: 'Beginner' },
//   { id: 103, name: 'Power BI', level: 'Beginner' },
//   { id: 104, name: 'Looker', level: 'Beginner' },
//   { id: 105, name: 'Excel', level: 'Intermediate' }
// ];

//     setPrimarySkills(sampleSkills);

//     // Uncomment this to fetch from API later
//     /*
//     const fetchPrimarySkills = async () => {
//       try {
//         const response = await fetch('/api/primary-skills');
//         const data = await response.json();
//         setPrimarySkills(data);
//       } catch (error) {
//         console.error('Error fetching primary skills:', error);
//       }
//     };
    
//     fetchPrimarySkills();
//     */
//   }, []);

//   const handleSkillSelect = (skill) => {
//     setSelectedSkill(skill);
//   };

//   const handleBack = () => {
//     setSelectedSkill(null);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredSkills = primarySkills.filter((skill) =>
//     skill.name.toLowerCase().includes(searchQuery)
//   );

//   if (selectedSkill) {
//     return (
//       <SkillForm 
//         primarySkill={selectedSkill} 
//         onBack={handleBack}
//         onSubmit={(data) => {
//           // Save user skills
//           setUserSkills((prev) => [...prev, data]);
//           setSelectedSkill(null);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="home-container">
//       <h1>Skill Assessment Platform</h1>

//       {/* Search bar */}
//       <div className="search-bar">
//         <input 
//           type="text" 
//           placeholder="Search skills..." 
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Skill matrix */}
//       <SkillMatrix skills={filteredSkills} onSkillSelect={handleSkillSelect} />

//       {/* Show user skills if any */}
//       {userSkills.length > 0 && (
//         <div className="user-skills">
//           <h2>Your Skills</h2>
//           <ul>
//             {userSkills.map((skill, index) => (
//               <li key={index}>
//                 <strong>{skill.name}</strong> – {skill.level || 'N/A'}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// src/components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import SkillMatrix from './SkillMatrix';
import SkillForm from './SkillForm';
import '../styles/Home.css';
import '../styles/SkillMatrix.css';

const Home = () => {
  const [primarySkills, setPrimarySkills] = useState([]);
  const [selectedPrimarySkill, setSelectedPrimarySkill] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [leftWidth, setLeftWidth] = useState(40); // initial width %
  const containerRef = useRef(null);
  const isResizing = useRef(false);

  useEffect(() => {
    // Sample primary skills
    const sampleSkills = [
      { id: 1, name: 'Java', level: 'Intermediate' },
      { id: 2, name: 'Python', level: 'Intermediate' },
      { id: 3, name: 'C', level: 'Beginner' },
      { id: 4, name: 'C++', level: 'Intermediate' },
      { id: 5, name: 'JavaScript', level: 'Intermediate' },
      { id: 6, name: 'TypeScript', level: 'Beginner' },
      { id: 7, name: 'React', level: 'Intermediate' },
      { id: 8, name: 'Angular', level: 'Beginner' },
      { id: 9, name: 'Vue.js', level: 'Beginner' },
      { id: 10, name: 'Node.js', level: 'Intermediate' }
    ];
    setPrimarySkills(sampleSkills);
  }, []);

  const handleSkillSelect = (skill) => {
    setSelectedPrimarySkill(skill);
    if (!userSkills.find(s => s.id === skill.id)) {
      setUserSkills(prev => [...prev, skill]);
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleRemoveUserSkill = (skillId) => {
    setUserSkills(prev => prev.filter(skill => skill.id !== skillId));
    if (selectedPrimarySkill?.id === skillId) setSelectedPrimarySkill(null);
  };

  const sortedSkills = [...primarySkills]
    .sort((a, b) => (userSkills.find(s => s.id === b.id) ? 1 : 0) - (userSkills.find(s => s.id === a.id) ? 1 : 0))
    .filter(skill => skill.name.toLowerCase().includes(searchQuery));

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

    if (newLeftWidth < 20) newLeftWidth = 20;
    if (newLeftWidth > 80) newLeftWidth = 80;

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
      <div className="left-panel" style={{ width: `${leftWidth}%` }}>
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
              {userSkills.map(skill => (
                <span key={skill.id} className="user-skill">
                  {skill.name}
                  <button onClick={() => handleRemoveUserSkill(skill.id)}>×</button>
                </span>
              ))}
            </div>
          </div>
        )}

        <SkillMatrix
          skills={sortedSkills}
          onSkillSelect={handleSkillSelect}
          selectedSkills={userSkills.map(s => s.id)}
        />
      </div>

      {/* Splitter */}
      <div className="splitter" onMouseDown={startResize}></div>

      {/* Right panel */}
      <div className="right-panel">
        {selectedPrimarySkill ? (
          <SkillForm
            primarySkill={selectedPrimarySkill}
            onBack={() => setSelectedPrimarySkill(null)}
            onSubmit={(data) => console.log('Form submitted:', data)}
          />
        ) : (
          <div className="placeholder">
            <h2>Select a skill from the left to configure its subskills.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
