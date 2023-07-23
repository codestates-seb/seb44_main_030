export type memberData = {
    memberId: number;
    name: string;
    email: string;
    nickname: string;
    bio: string;
};

export type CommunityPostData = {
    standardId: any;
    boardStandardId: number;
    title: string;
    content: string;
    view: number;
    createdAt: string;
    modifiedAt: string;
    member: memberData;
};

export type PageInfoData = {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};

export type allCommunityData = {
    data: Array<CommunityPostData>;
    pageInfo: PageInfoData;
};

export type RouteParams = {
    boardStandardId: string;
};
