import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';

import StudentCard from '../components/studentCard/StudentCard';
import StudentUpdateForm from '../components/studentForm/StudentForm';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const StudentDetailPage = () => {
  
    let params = useParams();
    const location = useLocation();
    const [student, setStudent] = useState({});
    const [showSnackbar, setShowSnackBar] = useState(false);


    useEffect(() => {
      // if(location.state?.student){
      //   setStudent(location.state?.student)
      // }else{

        if(location?.state?.fromCreateStudent){
          setShowSnackBar(true);
        }

        const singleStudentURL = `https://student-app-be.herokuapp.com/students/${studentId}`

        fetch(singleStudentURL)
            .then(res => res.json())
            .then(data => {
                setStudent(data);
            })
      // }

  }, []);

    const studentId = params.studentId;

    return (
    <div className='studentDetailPage'>
      <Snackbar 
        open={showSnackbar} 
        anchorOrigin={{ vertical: "top", horizontal: "center" }} 
        autoHideDuration={1500} 
        onClose={() => setShowSnackBar(false)}
      >
        <Alert>{location?.state?.studentName} was successfully deleted.</Alert>
      </Snackbar>
      {Object.keys(student).length > 0 && <StudentCard student={student} showDelete />}
      {Object.keys(student).length > 0 && <StudentUpdateForm student={student} setStudent={setStudent}/>}
    </div>
  )
}
