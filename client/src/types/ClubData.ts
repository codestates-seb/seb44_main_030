export interface ClubTag {
    tagId: number;
    tagName: string;
}

export interface ClubBoardData {
    boardClubId: number;
    memberId: number;
    title: string;
    content: string;
    dueDate: string;
    contact: string;
    view: number;
    tags: ClubTag[];
    boardClubStatus: string;
    createdAt: string;
    modifiedAt: string;
}

export interface ClubBoardPageInfo {
    page: number;
    size: number;
    totalElements?: number;
    totalPages?: number;
}

export interface ClubResponse {
    data: ClubBoardData[];
    pageInfo: ClubBoardPageInfo;
}
