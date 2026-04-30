import React from 'react';
import './StudentTable.css'
/**
 * רכיבים בטבלה
 * @param {Array} students - רשימה של תלמידות 
 * @param {string} title - כותרת 
 * @param {boolean} loading - האם המצב בטעינה
 */
const StudentTable = ({ students, title, loading }) => {
    if (loading) return <div >טוען נתונים...</div>;

    return (
        <div className="table">
            <h3 className="title">{title}</h3>
            <div className="scroll">
                <table className="student">
                    <thead>
                        <tr>
                            <th>כיתה</th>
                            <th>שם פרטי</th>
                            <th>שם משפחה</th>
                            <th>ת.ז</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.length > 0 ? (
                            students.map((stu) => (
                                <tr key={stu.id}>
                                    <td className="grade">{stu.grade}</td>
                                    <td>{stu.firstName}</td>
                                    <td>{stu.lastName}</td>
                                    <td className="id">{stu.id}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no_data">אין נתונים להצגה</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;