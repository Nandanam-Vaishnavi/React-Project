import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Employees from './Employees';
import Footer from './Footer';
import Nav from './nav';
import NotFound from './NotFound';
import GroupedTeamMembers from './GroupedTeamMembers';
import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  
    const [selectedTeam, setTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam'))|| "Team B");
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeList'))|| [{
        id:1,
        fullName:"bob", 
        designation:"java", 
        gender:"male", 
        teamName:"Team A"
    },
    {
        id:2, 
        fullName:"Jill", 
        designation:"node developer", 
        gender:"female", 
        teamName: "Team B"
    },
    {
        id:3, 
        fullName:"Jinny", 
        designation:"javascript developer", 
        gender:"female", 
        teamName: "Team C"
    },
    {
        id:4, 
        fullName:"James", 
        designation:"node developer", 
        gender:"male", 
        teamName: "Team D"
    },
    {
        id:5, 
        fullName:"John", 
        designation:"vue developer", 
        gender:"male", 
        teamName: "Team D"
    },


]);

useEffect(() => {
localStorage.setItem('employeeList', JSON.stringify(employees));
}, [employees]);

useEffect(() => {
    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));
    }, [selectedTeam]);
    

function handleTeamSelectionChange(event)
{
    setTeam(event.target.value);
}
function handleEmployeeCardClick(event)
{
const transformedEmployees = employees.map((employee) => employee.id === parseInt(event.currentTarget.id)
                                                         ? (employee.teamName === selectedTeam)?{...employee, teamName:''}:{...employee,teamName: selectedTeam} : employee);
setEmployees(transformedEmployees);
}
return (
  
  <div>
    <Router>
    <Nav />
    <Header
      selectedTeam={selectedTeam}
      teamMemberCount={employees?.filter(x => x?.teamName.toLowerCase().trim() === selectedTeam?.toLowerCase().trim())?.length}
    />
      <Routes>
        <Route path="/" element={<Employees
          employees={employees}
          selectedTeam={selectedTeam}
          handleEmployeeCardClick={handleEmployeeCardClick}
          handleTeamSelectionChange={handleTeamSelectionChange}
        />} />
        {/* Add more routes as needed */}
      </Routes>
      <Routes>
        <Route path="/GroupedTeamMembers" element={<GroupedTeamMembers
          employees={employees}
          selectedTeam={selectedTeam}
          setTeam={setTeam}
        />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
     
    <Footer />
  </div>
);
};


export default App;
