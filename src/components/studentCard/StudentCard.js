import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./StudentCard.scss";

const StudentCard = ({student}) => {
    
    // Props deconstructed
    const {pic, firstName, lastName, email, company, skill, grades} = student;

    // Hooks
    const [showGrades, setShowGrades] = useState(false)

    // Functions
    const calculateAverage = (grades) => {

        const sum = grades.reduce((a,b) => a + Number(b), 0);
        return sum / grades.length;
    };

    return (
        <div className='studentCard'>
            <div className='studentCard__profilePic'>
                <img src={pic} alt="" />
            </div>
            <div className='studentCard__info'>
                <div className='studentCard__name'>
                    {`${firstName} ${lastName}`}
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
                    Average: {calculateAverage(grades)}%
                </div>
                <div className='studentCard__gradesList' style={{"display": showGrades ? true : false}}>
                    {grades.map((grade, index) => {
                        return (
                            <div><span>Test {index + 1}:</span><span>{grade}%</span></div>
                            )
                        })}
                </div>
            </div>
            <div className='studentCard__toggleIcons'>

                {!showGrades && <FaPlus className='studentCard__toggleIcon' onClick={() => setShowGrades(true)} size="1.8em" />}
                {showGrades && <FaMinus className='studentCard__toggleIcon' onClick={() => setShowGrades(false)} size="1.8em" />}
            </div>
        </div>
    )
}

export default StudentCard;