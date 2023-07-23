import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getClubBoardData, getClubBoardDetail } from './ClubApi.ts';
import { ClubResponse } from '../../types/ClubData';

export default function useClubBoardData() {
    return useInfiniteQuery<ClubResponse, Error>(
        ['clubBoardData'],
        ({ pageParam = 1 }) => getClubBoardData(pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const maxPages = lastPage.pageInfo?.totalPages;
                const nextPage = allPages.length + 1;
                // console.log('maxPages, nextPage:', maxPages, nextPage);
                return maxPages && nextPage <= maxPages ? nextPage : undefined;
            },
        },
    );
}

export function useClubBoardDetail(boardClubId: number) {
    return useQuery(['clubDetailData', boardClubId], () => getClubBoardDetail(boardClubId));
}
