import axios from 'axios';
import { ClubResponse } from '../../types/ClubData';

export default async function getClubBoardData(page: number) {
    const API_URL = import.meta.env.VITE_KEY;
    const response = await axios.get<ClubResponse>(`${API_URL}/clubs?page=${page}&size=12`, {
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173' },
    });
    return response.data;
}
