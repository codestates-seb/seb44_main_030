
import axios from 'axios';
import {AxiosCommentType} from '../../types/CommentTypes';
import { useQuery } from '@tanstack/react-query';
// DetailCommentSection.tsx 에서 댓글 조회 시 사용
const getComments = async (boardId: number, boardType:string) => {
    let API_URL = `${import.meta.env.VITE_KEY}`;
    if (boardType === 'standardcomments') {
        API_URL = `${API_URL}/${boardType}/standards/${boardId}`
    }
    if (boardType === 'clubcomments') {
        API_URL = `${API_URL}/${boardType}/clubs/${boardId}`
    }
    const response = await axios.get<AxiosCommentType>(`${API_URL}`);
    return response.data;
};

export const useQueryComment = (boardId:number, boardType:string) => {
    return (
        useQuery({queryKey:[boardType,boardId], queryFn:()=>getComments(boardId, boardType)})
    )
}
