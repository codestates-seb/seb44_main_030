export type AxiosCommentType = {
    data: [CommentDataType];
    pageInfo: pageType;
}

export type CommentDataType = {
    boardStandardCommentId: number;
    memberId: number;
    boardStandardId: number;
    content: string;
    createdAt: string;
    modifiedAt: string;
}

export type pageType = {
    page: number;
    size: number;
    totalElement: number;
    totalPages: number;
}
