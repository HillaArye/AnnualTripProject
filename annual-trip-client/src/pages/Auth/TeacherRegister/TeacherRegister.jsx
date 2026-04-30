import React, { useState } from "react";
import TeacherServices from "../../../services/TeacherServices";
import { useNavigate } from "react-router-dom";
import './TeacherRegister.css';
import teacher_image from '../../../assets/teacher1.png';
import { Link } from "react-router-dom";
function TeacherRegister() {
    const [teacher, setTeacher] = useState({
        id: '',
        firstName: '',
        lastName: '',
        grade: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (teacher.id.length !== 9 || isNaN(teacher.id)) {
            alert("נא להזין 9 ספרות לתעודת זהות.");
            return;
        }
        try {
            const response = await TeacherServices.register_teacher(teacher);
            alert(`המורה ${response.data.firstName} נרשמה בהצלחה!`);
            navigate("/login");
        } catch (error) {
            console.error("error: ", error);
            alert("שגיאה: הרישום נכשל.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher({ ...teacher, [name]: value });
    };

    return (
        <div className="register_page">
            <div className="title">
                <h2>מערכת SafeZone | 'בית ספר 'בנות משה</h2>
            </div>

            <div className="register_detais">
                <div className="register_detais2">

                    <div className="register_form">
                        <div className="form">
                            <h3>SafeZone הרשמת מורה לצוות</h3>
                        </div>

                        <form onSubmit={handleSubmit} >
                            <div className="details">
                                <label>שם פרטי</label>
                                <input
                                    name="firstName"
                                    value={teacher.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                                <div className="details">
                                <label>שם משפחה</label>
                                <input
                                    name="lastName"
                                    value={teacher.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="details">
                                <label>תעודת זהות</label>
                                <input
                                    name="id"
                                    value={teacher.id}
                                    onChange={handleChange}
                                    maxLength="9"
                                />
                            </div>

                            <div className="details">
                                <label>כיתה / שכבה</label>
                                <input
                                    name="grade"
                                    value={teacher.grade}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="register_btn">הרשם עכשיו</button>
                        </form>

                        <div className="form_bottom">
                            <span>כבר רשומה? </span>
                            <Link to="/login">חזרי להתחברות</Link>
                        </div>
                    </div>

                    <div className="image_right">
                        <img src={teacher_image} className="teacher_image" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TeacherRegister;