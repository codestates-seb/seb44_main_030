import axios from 'axios';

export const getInfos = (id: number) => {
    return axios.get(`http://13.209.142.240:8080/members/${id}`).then((response) => response.data.data);
};
