import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {useCallback} from 'react';
export function useDeletePost(postId:number) {
    const navigate = useNavigate();
    const location = useLocation();
    const boardType = location.pathname.split('/')[1] === 'community' ? 'standards' : 'club';

    const mutation = useMutation((postId:number) => axios.delete(`${import.meta.env.VITE_KEY}/${boardType}/${postId}`), {
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
            if (window.confirm('게시글을 삭제하시겠습니까?')) {
                mutation.mutate(postId);
            }
        },
        [mutation],
    );

    return {handleDeletePost, boardType};
}
