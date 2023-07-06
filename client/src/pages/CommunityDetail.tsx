import React from 'react';
import { useLocation } from 'react-router-dom';
const CommunityDetail = () => {
    const location = useLocation();
    //standardId 이용해서 API 요청
    const standardId = location.state;
    return (
        <div>
            <div>커뮤니티 게시글 상세페이지입니다.</div>
            <div>게시글ID: {`${standardId}`}</div>
        </div>
    );
};

export default CommunityDetail;
