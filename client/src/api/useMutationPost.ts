import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {useCallback} from 'react';
import { usePostHeader } from '../api/getHeader.ts';
type DeletePostReturnType = {
    handleDeletePost: () => void;
    boardType: 'standards' | 'club';
};
//DetailContentSection.tsx 에서 게시글 삭제 기능에 사용
export function useDeletePost(postId:number):DeletePostReturnType {
    const navigate = useNavigate();
    const location = useLocation();
    const headers = usePostHeader(); 
    const boardType = location.pathname.split('/')[1] === 'community' ? 'standards' : 'club';

    const mutation = useMutation((postId:number) => axios.delete(`${import.meta.env.VITE_KEY}/${boardType}/${postId}`,headers), {
        onSuccess: () => {
            alert('게시글이 성공적으로 삭제되었습니다.');
            navigate(-1);
        },
        onError: () => {
            alert('게시글 삭제에 실패했습니다.');
        },
    });

    const handleDeletePost = useCallback(
        () => {
                mutation.mutate(postId);
        },
        [mutation,postId],
    );

    return {handleDeletePost, boardType};
}
