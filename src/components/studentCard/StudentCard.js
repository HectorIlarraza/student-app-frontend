import React, { useEffect, useState } from 'react';
import { Link } from  "react-router-dom";

import SingleTextInput from '../singleTextInput/SingleTextInput.js';
import EmptyView from "../emptyView/EmptyView";
import DialogueBox from '../dialogueBox/DialogueBox.js';

import "./StudentCard.scss";

import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";

const StudentCard = ({student}) => {
    
    // Props deconstructed
    const {pic, firstname, lastname, email, company, skill, id} = student;

    // Hooks
    const [grades, setGrades] = useState([]);
    const [showGrades, setShowGrades] = useState(false);
    const [gradesLoading, setGradesLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Functions
    const calculateAverage = (grades) => {

        const sum = grades.reduce((a,b) => a + Number(b.grade), 0);
        return sum / grades.length; 
    };

    const hideGrades = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setShowGrades(false);
    }

    const fetchAndShowGrades = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // do we already have the grades?
        if(grades.length > 0){
            setShowGrades(true);
        }else{

            setGradesLoading(true);
    
            const url = `https://student-app-be.herokuapp.com/students/${id}/grades`;
    
            fetch(url)
            .then(res => res.json())
            .then(data => {

                setGrades(data);
                setShowGrades(true);
                setGradesLoading(false);
            })
        }
        
    }

    const showDeleteUserDialouge = (e) => {
        setShowDeleteDialog(true);
    }

    const deleteUser = () => {
        // url to delete
        const url = `https://student-app-be.herokuapp.com/students/${id}`;

        fetch(url, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                // redirect to the home page
                // show toast that user was deleted

            }).catch(err => {
                // show toast that delete was successful
            })
    }
    
    // useEffect(() => {
    //     if(grades.length){
    //         setShowGrades(!showGrades);
    //     }
    // }, [grades])

    return (
        <div className='studentCard'>
            <Link to={`/students/${id}`} state={{ student: student}}>
            <div className='studentCard__profilePic'>
                <img src={pic} alt="" />
            </div>
            <div className='studentCard__info'>
                <div className='studentCard__name'>
                    {`${firstname} ${lastname}`}
                </div>
                <div className='studentCard__infoLine'>
                    Emails: {email}
                </div>
                <div className='studentCard__infoLine'>
                    Company: {company}
                </div>
                <div className='studentCard__infoLine'>
                    Skills: {skill}
                </div>
                <div className='studentCard__gradesList' style={{"display": showGrades ? "block" : "none"}}>
                    {grades.length > 0 && 
                        <>
                            <div className='studentCard__gradeAverage'>
                                Average: {grades.length && calculateAverage(grades)}%
                            </div>
                            {grades.map((grade, index) => {
                                return (
                                        <div key={index}><span>Test {index + 1}:</span><span>{grade.grade}%</span></div>
                                    )
                                })}
                        </>
                    }
                    {grades.length === 0 && <EmptyView text='No Grades for this Student'/>}
                </div>
            </div>
            <div className='studentCard__actionIcons'>
                {gradesLoading && <AiOutlineReload className='studentCard__toggleIcon-spinning' size="1.8em" />}
                {(!showGrades && !gradesLoading) && <FaPlus className='studentCard__toggleIcon' onClick={(e) => fetchAndShowGrades(e)} size="1.8em" />}
                {(showGrades && !gradesLoading) && <FaMinus className='studentCard__toggleIcon' onClick={(e) => hideGrades(e)} size="1.8em" />}
            </div>

            </Link>
            <div className='studentCard__tagCollectionRow'>
                <div className='studentCard__tagCollection'>
                    <div className='studentCard__tags'>
                        {tags.map((tag, index) => {
                            return (
                                <span className='studentCard__tag' key={tag + index}>{tag}</span>
                            )
                        })}
                    </div>
                    <div className='studentCard__tagInput'>
                        {<SingleTextInput onSubmit={setTags} collection={tags} searchTerm={tag} setSearchTerm={setTag} width="26%" placeholder="Add a tag" />}
                    </div>
                </div>
                <div>
                    {gradesLoading && <AiOutlineReload className='studentCard__toggleIcon-spinning' size="1.8em" />}
                    {(!showGrades && !gradesLoading) && <FaTrash className='studentCard__trashIcon' onClick={(e) => showDeleteUserDialouge(e)} size="1.8em" />}
                </div>
            </div>
            <DialogueBox open={showDeleteDialog} setOpen={setShowDeleteDialog} deleteUser={deleteUser}/>
        </div>
    )
}

export default StudentCard;