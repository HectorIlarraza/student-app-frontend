import React from 'react';

import StudentForm from '../components/studentForm/StudentForm';

function AddStudentPage() {
  return (
    <div>
        <StudentForm title='Add' method='POST'/>
    </div>
  )
}

export default AddStudentPage;