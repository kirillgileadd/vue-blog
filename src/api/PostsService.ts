import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {IPost} from "@/models";

export default class PostsService {
    private static config: AxiosRequestConfig = {
        baseURL: "https://jsonplaceholder.typicode.com/posts"
    }
    private static instance: AxiosInstance = axios.create(this.config);

    static async getPosts(limit: number, page: number, searchValue: string, selectionSort: string): Promise<AxiosResponse<IPost[]>> {
        return this.instance.get<IPost[]>('/', {
            params: {
                _limit: limit,
                _page: page,
                q: searchValue.trim(),
                _sort: selectionSort,
                _order: 'asc'
            }
        })
    }
    static async postPost(post: IPost): Promise<AxiosResponse<IPost>> {
        return this.instance.post<IPost>('/', post)
    }
    static async deletePost(post: IPost): Promise<AxiosResponse<object>> {
        return this.instance.delete<object>(`/${post.id}`)
    }
}