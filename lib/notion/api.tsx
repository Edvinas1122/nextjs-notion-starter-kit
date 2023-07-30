class NotionAPI {
	private apiBaseUrl: string;
	private rootDir: string;
	private authToken: string;
	private fetch: (url: string, params: any) => Promise<any>;
	private caching: boolean;

	constructor({ 
		rootDir = '',
		authToken = '',
		fetchFunction,
		caching = false
	}: { 
		rootDir?: string,
		authToken?: string,
		fetchFunction?: (url: string, params: any) => Promise<any>,
		caching?: boolean
	}) {
		this.rootDir = rootDir;
		this.authToken = authToken;
		this.apiBaseUrl = "https://api.notion.com/v1/";
		this.fetch = fetchFunction || this.fetchWrapper;
		this.caching = caching;
	}

	private async fetchWrapper(
		url: string,
		options?: RequestInit,
		revalidate?: false | number
	): Promise<Response>
	{
		const finalOptions = {
		  ...options,
		  next: { 
			revalidate: revalidate ? revalidate : this.caching ? 60 : 0, 
		}
		};
		return await fetch(url, finalOptions);
	}

	private headers(): any {
		if (!this.authToken) {
			return {
				'Notion-Version': '2022-06-28',
				'Content-Type': 'application/json'
			}
		}
		return {
			headers: {
				'Authorization': `Bearer ${this.authToken}`,
				'Notion-Version': '2022-06-28',
				'Content-Type': 'application/json'
			}
		}
	}

	async getPageInfo({
		pageId = this.rootDir,
	}: {
		pageId?: string
	} = {}): Promise<any>
	{
		const response = await this.fetch(`${this.apiBaseUrl}pages/${pageId}`, this.headers());
		const data = await response.json();
		return data;
	}

	async getPageBlocks({
		pageId = this.rootDir,
		count = 50,
	}: {
		pageId?: string,
		count?: number
	} = {}): Promise<any>
	{
		const response = await this.fetch(`${this.apiBaseUrl}blocks/${pageId}/children`, this.headers());
		const data = await response.json();
		return data;
	}
}

export const notion = new NotionAPI({
	rootDir: process.env.NEXT_PUBLIC_NOTION_ROOT_PAGE || '',
	authToken: process.env.ACCESS_API_KEY || ''
})
