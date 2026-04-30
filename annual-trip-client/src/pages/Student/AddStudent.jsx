import React, { useState } from "react";
import StudentServices from "../../services/StudentServices";
import FormField from "../../components/common/FormField";
import './AddStudent.css'

function AddStudent() {

    const [student, setStudent] = useState({
        id: "",
        firstName: "",
        lastName: "",
        grade: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (student.id.length !== 9 || isNaN(student.id)) {
            alert("נא להזין 9 ספרות לתעודת זהות");
            return;
        }

        try {
            const response = await StudentServices.add_student(student);
            setMessage(`${student.firstName} נוספה בהצלחה!`);
            setStudent({ id: "", firstName: "", lastName: "", grade: "" });
        } catch (error) {
            console.error("Error adding student:", error);
            setMessage("Error: no added!");
        }
    };
    return (
        <div className="add_container">
            <h2 className="title">הוספת תלמידה חדשה</h2>

            {message && (
                <div className={`mes ${message.includes("שגיאה") ? "error" : "success"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="form">
                <FormField
                    label="שם פרטי"
                    name="firstName"
                    value={student.firstName}
                    onChange={handleChange}

                />
                <FormField
                    label="שם משפחה"
                    name="lastName"
                    value={student.lastName}
                    onChange={handleChange}

                />
                <FormField
                    label="תעודת זהות"
                    name="id"
                    value={student.id}
                    onChange={handleChange}

                />
                <FormField
                    label="כיתה"
                    name="grade"
                    value={student.grade}
                    onChange={handleChange}

                />

                <button type="submit" className="submit_btn">הוסף תלמידה</button>
            </form>
        </div>
    );

}

export default AddStudent;