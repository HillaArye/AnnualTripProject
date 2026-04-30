import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherServices from "../../services/TeacherServices";
import './TeacherDashboard.css';
import AddStudent from '../Student/AddStudent';
import MyClass from '../Student/MyClass';
import AllStudents from '../Student/AllStudents';
import MapPage from '../Student/MapPage';
import logo from '../../assets/logo.png';

function TeacherDashboard() {
    const [teacher, setTeacher] = useState(null);
    const [activeSubTab, setActiveSubTab] = useState("my");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            const teacherId = localStorage.getItem('teacherId');
            if (!teacherId) {
                navigate("/login");
                return;
            }
            try {
                const response = await TeacherServices.login_teacher(teacherId);
                setTeacher(response.data);
            } catch (error) {
                console.error("Dashboard error:", error);
                navigate("/login");
            }
        };
        fetchTeacherDetails();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('teacherId');
        navigate("/login");
    };

    if (!teacher) return <div className="loading">טוען נתונים...</div>;

    return (
        <div className="dashboard">
            <header>
                <nav className="title">
                    <div>
                        <button className="logout" onClick={handleLogout}>יציאה</button>
                    </div>

                    <div className="title1">
                        <p>שלום למורה <span>{teacher.firstName}</span> של כיתה <span>{teacher.grade}</span></p>
                    </div>

                    <div>
                        <img src={logo} className="logo" />
                    </div>
                </nav>
            </header>

            <main className="main">
                <div className="side rigth">
                    <div className="titles">
                        <button
                            className={activeSubTab === "my" ? "active" : ""}
                            onClick={() => setActiveSubTab("my")}
                        >
                            הכיתה שלי
                        </button>
                        <button
                            className={activeSubTab === "all" ? "active" : ""}
                            onClick={() => setActiveSubTab("all")}
                        >
                            כלל ביה"ס
                        </button>
                    </div>

                    <div className="container_right">
                        {activeSubTab === "my" ? <MyClass /> : <AllStudents />}
                    </div>
                </div>

                <div className="map">
                    <div className="map1">
                        <MapPage />
                    </div>
                </div>

                <div className="side left">
                    <AddStudent />
                </div>
            </main>
        </div>
    );
}

export default TeacherDashboard;