/*
	an API wrapper class that handles the fetching of data from the Common APIs

	has a modular fetch function that can be replaced with a custom fetch function but
	still has limited modularity and might require an adapter pattern to be implemented

	on default it uses NextJS fetch function

	if implamenting this wrapper would require unexpected behavior, please keep a templated pattern
	that would not brake other implementations of this class

	usage:
		const api = new APIWrapper({
			parameters	
		});

		or 

		class CustomAPIWrapper extends APIWrapper {
			constructor(parameters) {
				super(parameters);
			}
		}
*/

export interface APIWrapperProps {
	apiBaseUrl: string;
	authToken: string;
	fetchFunction: (url: string, params: any) => Promise<any>;
	caching: boolean;
	headers: any;
}

export default class APIWrapper {
	private	apiBaseUrl: string;
	private	authToken: string;
	private	fetch: (url: string, params: any) => Promise<any>;
	private	caching: boolean;
	private	headers: any;

	constructor({
		apiBaseUrl = '',
		authToken = '',
		fetchFunction,
		caching = false,
		headers = {},
	}: APIWrapperProps
	) {
		this.authToken = authToken;
		this.fetch = fetchFunction || this.fetchWrapper;
		this.caching = caching;
		this.headers = headers;
		this.apiBaseUrl = apiBaseUrl;
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

	private getRequestHeaders(): any {
		return {
			...this.headers,
			'Authorization': `Bearer ${this.authToken}`,
			'Content-Type': 'application/json'
		}
	}

	protected async fetchData({
		endpoint = '',
		method = 'GET',
		body,
	}: {
		endpoint?: string,
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
		body?: any,
	} = {}): Promise<any>
	{
		const response = await this.fetch(`${this.apiBaseUrl}${endpoint}`, {
			method: method,
			headers: this.getRequestHeaders(),
			body: JSON.stringify(body),
		});
		const data = await response.json();
		return data;
	}
}
