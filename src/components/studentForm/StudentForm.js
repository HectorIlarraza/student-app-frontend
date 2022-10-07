import React, {useState} from 'react'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { AiOutlineReload } from "react-icons/ai";

import "./StudentForm.scss";

function StudentForm({student = {}, setStudent, title ="Update", method="PUT"}) {

  const [firstname, setFirstName] = useState(student.firstname);
  const [lastname, setLastName] = useState(student.lastname);
  const [company, setCompany] = useState(student.company);
  const [city, setCity] = useState(student.city);
  const [skill, setSkill] = useState(student.skill);
  const [pic, setPic] = useState(student.pic);
  const [anyChanges, setAnyChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackBar] = useState(false);
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);

  const handleChange = (e) => {
        
        setAnyChanges(true);
        
        const field = e.target.name;

        // eslint-disable-next-line default-case
        switch (field){
            case "firstname":
                setFirstName(e.target.value)
                break;
            case "lastname":
                setLastName(e.target.value);
                break;
            case "company":
                setCompany(e.target.value);
                break;
            case "city":
                setCity(e.target.value);
                break;
            case "skill":
                setSkill(e.target.value);
                break;
            case "pic":
                setPic(e.target.value);
                break;
        }
    }

    const handleSubmit = () => {
       
        // loading state
        setLoading(true)

        // set our target url
        const url = `https://student-app-be.herokuapp.com/students/${student.id}`;

        // what data are we passing to our backend

        let requestOptions = {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstname, lastname, company, city, skill, pic })
        };

        // fetch 
        fetch(url, requestOptions)
        .then(res => res.json())
        .then(data => {
            
            // success state
            setStudent(data);
            setAnyChanges(false);
            setSuccessfulUpdate(true);
            setShowSnackBar(true);

            // show success toast
            //TODO

            // error state
            //TODO

            // set loading to false
            setLoading(false);
            
        }).catch(err => {
            setLoading(false);
            // let user know an error has occurred
            setSuccessfulUpdate(false);
            setShowSnackBar(true);
        });
    }

    const action = method === "PUT" ? "updating student" : "adding student";

    const errorElement = <Alert severity="error">An error occurred while {action} — please try again later.</Alert>
    const successElement = <Alert>Student was updated successfully!</Alert>


  return (
    <div className='studentForm'>
        <Snackbar 
            open={showSnackbar} 
            anchorOrigin={{ vertical: "top", horizontal: "center" }} 
            autoHideDuration={1500} 
            onClose={() => setShowSnackBar(false)}
        >
           {successfulUpdate ? successElement : errorElement}    
        </Snackbar>

        <div className='studentForm__title'>{title} Student</div>
        <div className='studentForm__inputs'>
            <TextField 
                id='outlined-basic'
                name='firstname' 
                label='First Name' 
                variant='outlined' 
                value={firstname}
                onChange={(e) => handleChange(e)} 
            />
            <TextField 
                id='outlined-basic'
                name='lastname' 
                label='Last Name' 
                variant='outlined'  
                value={lastname} 
                onChange={(e) => handleChange(e)}    
            />
            <TextField 
                id='outlined-basic'
                name='company'  
                label='Company' 
                variant='outlined' 
                value={company} 
                onChange={(e) => handleChange(e)}
            />
            <TextField 
                id='outlined-basic'
                name='city'  
                label='City' 
                variant='outlined'  
                value={city}
                onChange={(e) => handleChange(e)} 
            />
            <TextField 
                id='outlined-basic' 
                name='skill' 
                label='Skill' 
                variant='outlined'  
                value={skill} 
                onChange={(e) => handleChange(e)} 
            /> 
            <TextField 
                id='outlined-basic' 
                name='pic' 
                label='Pic Url' 
                variant='outlined'  
                value={pic} 
                onChange={(e) => handleChange(e)}
             />
        </div>
        <div className='studentForm__submit'>
            <Button 
                variant='contained' 
                size='large' 
                disabled={!anyChanges}
                onClick={handleSubmit}
                endIcon={loading && <AiOutlineReload className='studentForm__submitLoader-spinning'/>}
            >
                {title}
            </Button>
        </div>
    </div>
  )
}

export default StudentForm;