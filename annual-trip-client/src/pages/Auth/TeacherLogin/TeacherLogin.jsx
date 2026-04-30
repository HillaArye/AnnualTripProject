import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import TeacherServices from "../../../services/TeacherServices";
import { Link } from 'react-router-dom';
import './TeacherLogin.css';
import teacher_image from '../../../assets/teacher.png';

function TeacherLogin() {

    const [id, setId] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if (id.length !== 9 || isNaN(id)) {
            alert("נא להזין 9 ספרות לת.ז");
            return;
        }
        try {
            const response = await TeacherServices.login_teacher(id);
            if (response.data != null) {
                localStorage.setItem('teacherId', id);
                navigate("/teacher-dashboard");
            }
        } catch (error) {
            console.error("login error", error);
            alert("Error: no found!");
        }
    };

    return (
        <div className="login_page">
            <div className="title">
                <h2>'י | בית ספר 'בנות משהSafeZone מערכת</h2>
            </div>
            <div className="login_card">
                <div className="login_card_details">
                    <div className="card_right">
                        <div className="form">
                            <h3>התחברות מורה</h3>
                        </div>
                        <form onSubmit={handleLogin} >
                            <div className="details">
                                <label>:הזיני מספר תעודת זהות</label>
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    maxLength="9"
                                />
                            </div>
                            <button type="submit" className="login_btn">כניסה</button>
                        </form>
                        <div className="form_bottom">
                            <span>אין לך חשבון? </span>
                            <Link to="/register">הרשמי עכשיו</Link>
                        </div>
                    </div>


                    <div className="card_left">
                        <img src={teacher_image} className="teacher_image" />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default TeacherLogin;