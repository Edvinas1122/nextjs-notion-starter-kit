import NotionAPIV3, { NotionEndpointsV3 } from "./V3";
import { formatPageId } from "./utils/pageIdFrormat";

export default class NotionServiceV3 {
	constructor(
		private api: NotionAPIV3,
	) {}

	async getPageContents(pageId?: string) {
		const contents = await this.api.interact({
			endpoint_name: NotionEndpointsV3.loadPageChunk,
			body: pageId ? {pageId: formatPageId(pageId)} : undefined,
		});
		return contents;
	}

	async getCollection(
		id: string,
		viewId: string
	) {
		const collection = await this.api.interact({
			endpoint_name: NotionEndpointsV3.queryCollection,
			body: {
				collection: {
					id: id,
				},
				collectionView: {
					id: viewId,
				},
				loader: {
					type: 'reducer',
					reducers: {
						collection_group_results: {
							type: 'results',
							limit: 10,
							loadContentCover: true,
						},
					},
					// sort: [],
					filters: {
						filters: [],
						operator: 'and',
					},
					userTimeZone: 'America/New_York',
				}
			},
		});
		return collection;
	}

}