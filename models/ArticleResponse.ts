export interface ArticleResponse {
  id: string
  title: string
  body: string
}

export interface ArticleListResponse {
  articles: Array<ArticleResponse>
}
