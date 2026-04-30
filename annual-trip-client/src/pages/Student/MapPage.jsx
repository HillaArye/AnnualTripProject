import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import StudentServices from '../../services/StudentServices';
import TeacherServices from '../../services/TeacherServices';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';

function MapPage() {
    const [teacherPos, setTeacherPos] = useState([32.086, 34.84]);
    const [students, setStudents] = useState([]);
    const [studentLocations, setStudentLocations] = useState([]);
    const [distStuId, setDistStuId] = useState([]);
    const [loading, setLoading] = useState(true);
    const teacherId = localStorage.getItem('teacherId');

    const fetchUpdate = async (lat, lon) => {
        try {
            const location_update = {
                id: teacherId,
                coordinates: {
                    Latitude: { Degrees: Math.floor(lat).toString(), Minutes: Math.floor((lat % 1) * 60).toString(), Seconds: "0" },
                    Longitude: { Degrees: Math.floor(lon).toString(), Minutes: Math.floor((lon % 1) * 60).toString(), Seconds: "0" }
                },
                time: new Date().toISOString().replace('Z', '')
            };
            await StudentServices.add_location_students(location_update);

            const responseLocs = await StudentServices.get_location_students(teacherId);
            setStudentLocations(responseLocs.data);

            const responseDIST = await StudentServices.get_distant_students(lat, lon);
            const idStudents = responseDIST.data.map(s => s.id);
            setDistStuId(idStudents);
        } catch (error) {
            console.error("ERROR in fetchUpdate: ", error);
        }
    };

    const studentsOnMap = async (teacherLat, teacherLon) => {
        try {
            const responseStu = await TeacherServices.get_my_class(teacherId);
            const myStudents = responseStu.data;
            setStudents(myStudents);

            for (let s of myStudents) {
                let lat, lon;
                let isValid = false;

                while (!isValid) {
                    lat = teacherLat + (Math.random() - 0.5) * 0.04;
                    lon = teacherLon + (Math.random() - 0.5) * 0.04;

                    if (lat !== 0 && !isNaN(lat) && Math.abs(lat - teacherLat) > 0.0001) {
                        isValid = true;
                    }
                }

                const location_student = {
                    id: s.id,
                    coordinates: {
                        Latitude: { Degrees: Math.floor(lat).toString(), Minutes: Math.floor((lat % 1) * 60).toString(), Seconds: "0" },
                        Longitude: { Degrees: Math.floor(lon).toString(), Minutes: Math.floor((lon % 1) * 60).toString(), Seconds: "0" }
                    },
                    time: new Date().toISOString().replace('Z', '')
                };
                await StudentServices.add_location_students(location_student);
            }

            await fetchUpdate(teacherLat, teacherLon);

        } catch (e) {
            console.error("Error in studentsOnMap", e);
        }
    };

    useEffect(() => {
        let interval;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (p) => {
                const { latitude, longitude } = p.coords;
                setTeacherPos([latitude, longitude]);

                await studentsOnMap(latitude, longitude);
                
                setLoading(false);


                interval = setInterval(() => {
                    fetchUpdate(latitude, longitude);
                }, 60000);
            });
        }
        return () => { if (interval) clearInterval(interval); };
    }, []);

    const teacherIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const studentsIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const BoldIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        className: 'blink-red'
    });

    if (loading) return <div className="loading-spinner">טוען נתונים....</div>;

    return (
        <div className="map-page-wrapper">
            <h2 className="title">מפת מעקב בזמן אמת - בנות משה</h2>

            <div className="map_container" style={{ height: '550px', width: '100%', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <MapContainer
                    key={`${teacherPos[0]}-${teacherPos[1]}`}
                    center={teacherPos}
                    zoom={14}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={teacherPos} icon={teacherIcon}>
                        <Popup><b>ID: {teacherId}</b><br />מורה בתפקיד</Popup>
                    </Marker>

                    {studentLocations.map((loc) => {
                      
                        if (String(loc.studentId) === String(teacherId)) return null;

                        const sInfo = students.find(s => String(s.id) === String(loc.studentId));
                        
                        if (!sInfo) return null;

                        if (!loc.latitude || !loc.longitude || (loc.latitude === 0 && loc.longitude === 0)) return null;

                        const isDistant = distStuId.some(id => String(id) === String(loc.studentId));

                        return (
                            <Marker
                                key={loc.studentId}
                                position={[loc.latitude, loc.longitude]}
                                icon={isDistant ? BoldIcon : studentsIcon}
                            >
                                <Popup>
                                    <span className={`name ${isDistant ? 'distant' : 'in-range'}`}>
                                        {`${sInfo.firstName} ${sInfo.lastName} (${loc.studentId})`}
                                    </span>
                                  
                                    <span className="isOk" style={{ color: isDistant ? 'red' : 'green', fontWeight: 'bold' }}>
                                        {isDistant ? "חרגה ממרחק 3 קמ" : " בטווח תקין"}
                                    </span>
                                    <br />
                                    <small className="update_time">
                                        עודכן: {new Date().toLocaleTimeString()}
                                    </small>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}

export default MapPage;