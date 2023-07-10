import { createSlice } from '@reduxjs/toolkit';
import { Info } from '../types/info';

type InitialState = Info[] | null;

const initialState: InitialState = [
    {
        id: 1,
        addressName: '서울 용산구 동자동 43-205',
        placeName: '서울역',
        position: {
            lat: 37.5546788388674,
            lng: 126.970606917394,
        },
    },
    {
        id: 2,
        addressName: '서울 강남구 역삼동 858',
        placeName: '강남역 2호선',
        position: {
            lat: 37.49808633653005,
            lng: 127.02800140627488,
        },
    },
    {
        id: 3,
        addressName: '서울 관악구 봉천동 979-2',
        placeName: '서울대입구역 2호선',
        position: {
            lat: 37.4812845080678,
            lng: 126.952713197762,
        },
    },
];

const InfoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
});

export default InfoSlice.reducer;
