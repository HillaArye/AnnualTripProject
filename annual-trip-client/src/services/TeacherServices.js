import axios from 'axios';
import api from '../api/api';
const url_api_teachers = '/teachers';

const TeacherServices = {

    register_teacher: (teacherData) => {
        return api.post(`${url_api_teachers}/add`, teacherData);
    },

    login_teacher: (id) => {
        return api.get(`${url_api_teachers}/${id}`);
    },

    get_my_class: (id) => {
        return api.get(`${url_api_teachers}/myclass/${id}`);
    }

}
export default TeacherServices;
