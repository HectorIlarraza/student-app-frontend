import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import StudentCard from '../components/studentCard/StudentCard';

export const StudentDetailPage = () => {
  
    let params = useParams();
    const location = useLocation();
    const [student, setStudent] = useState({});

    // How to get the student data from location???

    useEffect(() => {
      if(location.state?.student){
        setStudent(location.state?.student)
      }else{

        const singleStudentURL = `https://student-app-be.herokuapp.com/students/${studentId}`

        fetch(singleStudentURL)
            .then(res => res.json())
            .then(data => {
                setStudent(data);
            })
      }

  }, []);

    const studentId = params.studentId;

    // with the student Id, we can fetch student info
    // from our API

    // delete student
    // add icon on detail page (ie. garbage can)
    // on click open confirm dialogue
    // on cancel, close dialogue
    // on confirm, show loader while delete happens
    // on error, show toast that delete was not successful
    // on success, redirect to home page
    // and show toast that user was deleted. 

    return (
    <div className='studentDetailPage'>
        {Object.keys(student).length > 0 && <StudentCard student={student}/>}
    </div>
  )
}
