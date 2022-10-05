import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SingleTextInput from '../singleTextInput/SingleTextInput';
import StudentCard from "../studentCard/StudentCard";
import EmptyView from '../emptyView/EmptyView';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import "./StudentList.scss";

const StudentList = (props) => {

    let location = useLocation();

    // hooks
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackBar] = useState(false);

    // function
    useEffect(() => {

      setLoading(true);

      if(location?.state?.studentName){
        // alert that user user was deleted
        setShowSnackBar(true);
      }

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
       
        const fullName = `${student.firstname} ${student.lastname}`;
       
        const fullNameToLowerCase = fullName.toLowerCase();
       
        const searchTermToLowerCase = searchTerm.toLowerCase();

        return fullNameToLowerCase.includes(searchTermToLowerCase);
      });
    };

    // return or JSX
  return (
    <div className='studentList'>
      <Snackbar 
        open={showSnackbar} 
        anchorOrigin={{ vertical: "top", horizontal: "center" }} 
        autoHideDuration={1500} 
        onClose={() => setShowSnackBar(false)}
        >
        <Alert>{location?.state?.studentName} was successfully deleted.</Alert>
      </Snackbar>
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