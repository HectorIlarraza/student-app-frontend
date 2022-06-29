import React from 'react';

import "./StudentCard.scss";

const StudentCard = ({student}) => {
    
    const {pic, firstName, lastName, email, company, skill, grades} = student;

    // Functions

    const calculateAverage = (grades) => {

        // let sum = 0;

        // grades.map(grade => {
        //      sum += Number(grade);
        //});

        // return sum / grades/length;

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
        </div>
    )
}

export default StudentCard;