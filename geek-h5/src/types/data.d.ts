export type Token = {
    token: string
    refresh_token: string
}
// 接口返回的数据类型：
export type LoginResponse = ApiResponse<Token>
type ApiResponse<Data> = {
    message: string
    data: Data
}
export type User = {
    id: string
    name: string
    photo: string
    art_count: number
    follow_count: number
    fans_count: number
    like_count: number
}
// 用户
export type UserResponse = ApiResponse<User>
export type UserProfile = {
    id: string
    photo: string
    name: string
    mobile: string
    gender: number
    birthday: string
    intro: string
}
export type UserProfileResponse = ApiResponse<UserProfile>
export type UserPhotoResponse = ApiResponse<{
    photo: string
}>
export type Channel = {
    id: number
    name: string
}
export type UserChannel = {
    channels: Channel[]
}
export type AllChannels = {
    channels: Channel[]
}
export type AllChannelsResponse = ApiResponse<AllChannels>
export type UserChannelResponse = ApiResponse<UserChannel>
export type Articles = {
    pre_timestamp: string
    results: {
        art_id: string
        aut_id: string
        aut_name: string
        comm_count: number
        cover: {
            type: number
            images: string[]
        }
        pubdate: string
        title: string
    }[]
}
export type ArticlesResponse = ApiResponse<Articles>
export type Suggestion = {
    options: string[]
}
export type SuggestionResponse = ApiResponse<Suggestion>
export type SearchResult = {
    page: number
    per_page: number
    total_count: number
    results: Articles['results']
}
export type SearchResultResponse = ApiResponse<SearchResult>
export type ArticleDetail = {
    art_id: string
    title: string
    pubdate: string
    aut_id: string
    aut_name: string
    aut_photo: string
    is_followed: boolean
    attitude: number
    content: string
    is_collected: boolean
    // 接口中缺失
    comm_count: number
    like_count: number
    read_count: number
}
export type ArticleDetailResponse = ApiResponse<ArticleDetail>
// 评论项的类型
export type ArtComment = {
    com_id: string
    aut_id: string
    aut_name: string
    aut_photo: string
    like_count: number
    reply_count: number
    pubdate: string
    content: string
    is_liking: boolean
    is_followed: boolean
}
// 文章评论的类型
export type ArticleComment = {
    total_count: number
    end_id: string | null
    last_id: string | null
    results: ArtComment[]
}
export type ArticleCommentResponse = ApiResponse<ArticleComment>
export type AddArticleComment = {
    com_id: string
    new_obj: ArtComment
    target: string
}
type AddCommentReply = AddArticleComment & {
    art_id: string
}
export type AddCommentReplyResponse = ApiResponse<AddCommentReply>
export type AddArticleCommentResponse = ApiResponse<AddArticleComment>