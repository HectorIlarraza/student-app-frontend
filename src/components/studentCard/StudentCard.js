import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { Link } from  "react-router-dom";
import SingleTextInput from '../singleTextInput/SingleTextInput.js';
import "./StudentCard.scss";

const StudentCard = ({student}) => {
    
    // Props deconstructed
    const {pic, firstname, lastname, email, company, skill, grades = []} = student;

    // Hooks
    const [showGrades, setShowGrades] = useState(false);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

    console.log(tag);

    // Functions
    const calculateAverage = (grades) => {

        const sum = grades.reduce((a,b) => a + Number(b), 0);
        return sum / grades.length;
    };

    const toggleGrades = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowGrades(!showGrades);
    }

    return (
        <div className='studentCard'>
            <Link to={`/students/${student.id}`} state={{ student: student}}>
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
                <div className='studentCard__infoLine'>
                    Average: {grades.length && calculateAverage(grades)}%
                </div>
                <div className='studentCard__gradesList' style={{"display": showGrades ? "block" : "none"}}>
                    {grades.map((grade, index) => {
                        return (
                                <div key={index}><span>Test {index + 1}:</span><span>{grade}%</span></div>
                            )
                        })}
                </div>
            </div>
            <div className='studentCard__toggleIcons'>

                {!showGrades && <FaPlus className='studentCard__toggleIcon' onClick={(e) => toggleGrades(e)} size="1.8em" />}
                {showGrades && <FaMinus className='studentCard__toggleIcon' onClick={(e) => toggleGrades(e)} size="1.8em" />}
            </div>

            </Link>
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
        </div>
    )
}

export default StudentCard;