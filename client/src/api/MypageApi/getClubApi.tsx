import axios from 'axios';

export const getClubdata = (page: number) => {
    const API_URL = import.meta.env.VITE_KEY;
    return axios.get(`${API_URL}/clubs?page=${page}&size=20`).then((response) => {
        return { postData: response.data.data, pageInfo: response.data.pageInfo };
    });
};
