import React, { useEffect, useState } from "react";
import StudentServices from "../../services/StudentServices";
import StudentTable from "../../components/common/StudentTable";

function AllStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await StudentServices.get_all_students(teacherId);
                setStudents(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching all students:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [teacherId]);

    return (
        <div className="all_container">
            <StudentTable
                students={students}
                title="תלמידות כלל בית הספר"
                loading={loading}
            />
        </div>
    );
}

export default AllStudents;