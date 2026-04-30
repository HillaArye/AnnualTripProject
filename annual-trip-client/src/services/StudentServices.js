import axios from "axios";
import api from "../api/api";

const url_api_students = "/students";

const StudentServices = {

    get_all_students: () => {
        return api.get(`${url_api_students}/all`);
    },

    add_student: (studentDetails) => {
        return api.post(`${url_api_students}/add`, studentDetails)
    },

    get_location_students: () => {
        return api.get(`${url_api_students}/locations`);
    },

    add_location_students: (locationofteacher) => {
        return api.post(`${url_api_students}/addLocation`, locationofteacher);
    },

    get_distant_students: (lat, lon) => {
        return api.get(`/teachers/distant-students`, {
            params: {
                latitude: lat,
                longitude: lon
            }
        });
    }

}
export default StudentServices;
