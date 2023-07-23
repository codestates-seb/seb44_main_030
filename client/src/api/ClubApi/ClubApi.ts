import axios from 'axios';
import { ClubResponse } from '../../types/ClubData';

export async function getClubBoardData(page: number) {
    const API_URL = import.meta.env.VITE_KEY;
    const response = await axios.get<ClubResponse>(`${API_URL}/clubs?page=${page}&size=6`, {});
    return response.data;
}

export async function getClubBoardDetail(boardClubId: number) {
    const API_URL = import.meta.env.VITE_KEY;
    const response = await axios.get(`${API_URL}/clubs/${boardClubId}`, {});
    return response.data;
}
