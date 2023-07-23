import axios from 'axios';

export const getCommuity = (page: number) => {
    const API_URL = import.meta.env.VITE_KEY;
    return axios.get(`${API_URL}/members/mypage/standards/1?page=${page}&size=20`).then((response) => {
        return { postData: response.data.data, pageInfo: response.data.pageInfo };
    });
};

// /members/mypage/standards/{member-id}?page=1&size=5
