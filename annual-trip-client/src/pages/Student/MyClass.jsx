import React, { useEffect, useState } from "react";
import TeacherServices from "../../services/TeacherServices";
import StudentTable from "../../components/common/StudentTable";
import FormField from "../../components/common/FormField";

function MyClass() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TeacherServices.get_my_class(teacherId);
                setStudents(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching my class:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [teacherId]);

    const gradeTitle = students.length > 0 ? `תלמידות כיתה  ${students[0].grade}` : "הכיתה שלי";

    return (
        <div className="my_container">
            <StudentTable
                students={students}
                title={gradeTitle}
                loading={loading}
            />
        </div>
    );
}

export default MyClass;