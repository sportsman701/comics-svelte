import { Request } from "express"

export class Pagination {
    readonly DEFAULT_PAGE = 1
    readonly DEFAULT_PAGE_SIZE = 100

    page: number
    pageSize: number

    constructor(request: Request) {
        this.page = parseInt(request.query.page as string, 10) || this.DEFAULT_PAGE
        this.pageSize = parseInt(request.query.pageSize as string, 10) || this.DEFAULT_PAGE_SIZE
    }

    getLimit = () => this.pageSize
    getOffset = () => this.pageSize * (this.page -1)

    getResponseMeta = (result: any[]) => {
        const numResults = result.length

        return {
            page: this.page,
            pageSize: this.pageSize,
            previousPage: (this.page > 1 && numResults > 0 ? this.page - 1 : null),
            nextPage: (numResults == this.pageSize ? this.page +1 : null)
        } 
    }
}