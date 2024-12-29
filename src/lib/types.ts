export type Post = {
	title: string
	slug: string
	date: string
	tags: string[]
	preview: string
	type: PostType
	lang?: PostLang
	description?: string
	video?: string
	link?: string
	preview_video?: string
	subtitle?: string
}

export interface GetPostsParams {
	page?: number
	tag?: string
	slugList?: string[]
}

export interface GetPostsResponse {
	items: Post[]
	totalCount: number
}

export type PostType = 'photos' | 'video' | 'insta' | 'link' | 'quote' | 'talks'

type PostLang = 'en' | 'ru'
