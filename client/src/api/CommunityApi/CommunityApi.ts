import axios from 'axios';
import {allCommunityData} from '../../types/CommunityTypes';
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

