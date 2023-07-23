
import axios from 'axios';
import {allCommunityData} from '../../types/CommunityTypes';

// page/Community.tsx 에서 모든 게시글 조회 시 사용
export const getTotalCommunityPost = async (page:number,size:number) => {
    const response = await axios.get<allCommunityData>(`${import.meta.env.VITE_KEY}/standards`, {
        params: {
            page: page,
            size: size,
        },
    });
    return { 
        postData: response.data.data,
        pageInfo: response.data.pageInfo
    };
};

// page/CommunityDetail.tsx 에서 게시글 상세 조회 시 사용

export const getDetailCommunityPost = async (boardStandardId:string) => {
    const response = await axios.get(`${import.meta.env.VITE_KEY}/standards/${boardStandardId}`);
    return response.data.data;
};