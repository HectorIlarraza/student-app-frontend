import React from 'react'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./StudentUpdateForm.scss";

function StudentUpdateForm(props) {
  return (
    <div className='studentUpdateForm'>
        <div className='studentUpdateForm__title'>Update Form</div>
        <div className='studentUpdateForm__inputs'>
            <TextField id='outlined-basic' label='First Name' variant='outlined' />
            <TextField id='outlined-basic' label='Last Name' variant='outlined' />
            <TextField id='outlined-basic' label='Company' variant='outlined' />
            <TextField id='outlined-basic' label='City' variant='outlined' />
            <TextField id='outlined-basic' label='Skill' variant='outlined' /> 
            <TextField id='outlined-basic' label='Pic Url' variant='outlined' />
        </div>
        <div className='studentUpdateForm__submit'>
            <Button variant='contained' size='large'>Update</Button>
        </div>
    </div>
  )
}

export default StudentUpdateForm;