import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfoInstance } from '../store/info';
import Wrapper from '../components/style/Wrapper';
import SearchResult from '../components/style/SearchResult';
import { RootState } from '../store/store';

interface SearchResponse {
    documents: {
        address_name: string;
        category_group_code: string;
        category_group_name: string;
        category_name: string;
        distance: string;
        id: string;
        phone: string;
        place_name: string;
        place_url: string;
        road_address_name: string;
        x: string;
        y: string;
    }[];
}

const SearchEngine = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const infodata = useSelector((state: RootState) => state.info.infoInstance);

    const onClickHandler = async () => {
        const result = axios.get<SearchResponse>(
            encodeURI(`https://dapi.kakao.com/v2/local/search/keyword?query=${keyword}`),
            {
                headers: {
                    Authorization: `KakaoAK 2f22bcea66f5cf1a556e5c4ec4c5bd47`,
                },
            },
        );
        const infos = (await result).data.documents.map((item) => ({
            id: Number(item.id),
            placeName: item.place_name,
            addressName: item.address_name,
            position: {
                lat: Number(item.y),
                lng: Number(item.x),
            },
        }));
        dispatch(setInfoInstance(infos));
    };

    return (
        <Wrapper width="300px" height="20px">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                ></input>
                <button onClick={onClickHandler}>Search</button>
            </div>
        </Wrapper>
    );
};

export default SearchEngine;