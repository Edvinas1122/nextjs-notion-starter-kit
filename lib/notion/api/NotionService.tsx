import NotionAPI, { NotionEndpoints } from "./V1";

export default class NotionService {
	constructor(
		private api: NotionAPI,
	) {}

	async getPage(pageId?: string) {
        return this.api.interact({
            endpoint_name: NotionEndpoints.getPage,
            params: pageId ? { pageId: pageId } : undefined,
        });
    }

    async search(query: string) {
        return this.api.interact({
            endpoint_name: NotionEndpoints.search,
            body: {
                query: query,
            },
        });
    }
}
