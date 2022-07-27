import React, { useEffect, useState } from 'react';
import StudentCard from "../studentCard/StudentCard";
import SingleTextInput from '../singleTextInput/SingleTextInput';
import "./StudentList.scss";
import EmptyView from '../emptyView/EmptyView';

const StudentList = () => {

    // hooks
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // function
    useEffect(() => {

      setLoading(true);

      const url = "https://student-app-be.herokuapp.com/students";
      // reach out to the backend
      fetch(url)
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
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
      <SingleTextInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filterStudents.map((student, index) => {
        return (
            <StudentCard student={student} key={index}/>
        )
      })}

      {loading && <EmptyView center text='Loading... ' />}
      
      {!loading && filterStudents.length === 0 && <EmptyView center />}
    </div>
  )
}

export default StudentList;