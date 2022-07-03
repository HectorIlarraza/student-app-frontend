import React, { useEffect, useState } from 'react';
import StudentCard from "../studentCard/StudentCard";
import SearchBar from '../searchBar/SearchBar';
import "./StudentList.scss";

const StudentList = () => {

    // hooks
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // function
    useEffect(() => {
      const url = "https://student-app-be.herokuapp.com/students";
      // reach out to the backend
      fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setStudents(data.students);
      })
      // get our students
      // update our students hook with the new data

    }, []); // empty array means runs on mount

    // When search term is updated, this component will rerender
    // what to do on a re-render
    let filterStudents = students;

    if(searchTerm){
        filterStudents= students.filter(student => {
       
        const fullName = `${student.firstName} ${student.lastName}`;
       
        const fullNameToLowerCase = fullName.toLowerCase();
       
        const searchTermToLowerCase = searchTerm.toLowerCase();

        return fullNameToLowerCase.includes(searchTermToLowerCase);
      });
    };

    // return or JSX
  return (
    <div className='studentList'>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filterStudents.map((student, index) => {
        return (
            <StudentCard student={student} key={index}/>
        )
      })}

      {filterStudents.length == 0 && <div className='studentList__noResults'>No Results</div>}
    </div>
  )
}

export default StudentList;