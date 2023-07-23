import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInfoInstance } from '../store/info';

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
    const KAKAO_KEY = import.meta.env.VITE_KAKAO;
    const onClickHandler = async () => {
        const result = axios.get<SearchResponse>(
            encodeURI(`https://dapi.kakao.com/v2/local/search/keyword?query=${keyword}`),
            {
                headers: {
                    Authorization: KAKAO_KEY,
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

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler();
        }
    };
    return (
        <Searchbox>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <input
                    style={{ height: '20px' }}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    onKeyPress={onKeyPress}
                ></input>
                <button onClick={onClickHandler}>Search</button>
            </div>
        </Searchbox>
    );
};

const Searchbox = styled.div`
    width: 330px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
    background-color: white;
`;

export default SearchEngine;
