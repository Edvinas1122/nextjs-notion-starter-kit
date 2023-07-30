import APIWrapper, {APIWrapperProps} from '../modules/api_wrapper';

class NotionAPI extends APIWrapper {
	private rootPageDir: string;

	constructor({ 
		rootPageDir = '',
		authToken = '',
		fetchFunction,
		caching = false
	}: { 
		rootPageDir?: string,
		authToken?: string,
		fetchFunction?: (url: string, params: any) => Promise<any>,
		caching?: boolean
	}) {
		super({
			apiBaseUrl: "https://api.notion.com/v1/",
			authToken,
			fetchFunction,
			caching,
			headers: {
				'Notion-Version': '2022-06-28'
			}
		});
		this.rootPageDir = rootPageDir;
	}

	async getPage({
		pageId = this.rootPageDir,
	}: {
		pageId?: string
	} = {}): Promise<any>
	{
		return this.fetchData({ endpoint: `pages/${pageId}` });
	}
	
	async getBlockChildren({
		blockId = this.rootPageDir,
		count = 50,
	}: {
		blockId?: string,
		count?: number
	} = {}): Promise<any>
	{
		return this.fetchData({ endpoint: `blocks/${blockId}/children` });
	}

	async getBlock({
		blockId
	}: {
		blockId: string
	} = {}): Promise<any>
	{
		return this.fetchData({ endpoint: `blocks/${blockId}` });
	}
	
	async getDatabase({
		databaseId
	}: {
		databaseId: string
	} = {}): Promise<any>
	{
		return this.fetchData({ endpoint: `databases/${databaseId}` });
	}

	async queryDatabase({
		databaseId,
		filter = undefined,
		sort = undefined,
		start_cursor = undefined,
		page_size = 100
	}: {
		databaseId: string,
		filter?: any,
		sort?: any,
		start_cursor?: string,
		page_size?: number
	} = {}): Promise<any>
	{
		return this.fetchData({ endpoint: `databases/${databaseId}/query`, method: "POST", body: { filter, sort, start_cursor, page_size } });
	}

	async getPagePropertyItem({
		pageId = this.rootPageDir,
		propertyId
	}: {
		pageId?: string,
		propertyId: string
	} = {}): Promise<any>
	{
		return this.fetchData({ endpoint: `pages/${pageId}/properties/${propertyId}` });
	}

	async search({
		query = '',
		filter = undefined,
		sort = undefined,
		start_cursor = undefined,
		page_size = 100
	}: {
		query?: string,
		filter?: any,
		sort?: any,
		start_cursor?: string,
		page_size?: number
	} = {}): Promise<any>
	{
		return this.fetchData({ endpoint: `search`, method: "POST", body: { query, filter, sort, start_cursor, page_size } });
	}
}

export const notion = new NotionAPI({
	rootPageDir: process.env.NEXT_PUBLIC_NOTION_ROOT_PAGE || '',
	authToken: process.env.ACCESS_API_KEY || ''
})
