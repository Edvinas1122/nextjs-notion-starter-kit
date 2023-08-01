import API, { APIInfo, DefaultParams } from '@/lib/modules/api_wrapper';

export enum NotionEndpointsV3 {
	loadPageChunk = 'loadPageChunk',
	queryCollection = 'queryCollection',
	getRecordValues = 'getRecordValues',
	syncRecordValues = 'syncRecordValues',
	getSpaces = 'getSpaces',
	getSpace = 'getSpace',
}

const notionAPI3Config: APIInfo = {
	name: 'NotionAPIV3',
	apiBaseUrl: 'https://www.notion.so/api/v3/',
	headers: {
		'Content-Type': 'application/json',
	},
	endpoints: [
		{ name: NotionEndpointsV3.loadPageChunk, path: 'loadPageChunk', method: 'POST' },
		{ name: NotionEndpointsV3.queryCollection, path: 'queryCollection', method: 'POST' },
		{ name: NotionEndpointsV3.getRecordValues, path: 'getRecordValues', method: 'POST' },
		{ name: NotionEndpointsV3.syncRecordValues, path: 'syncRecordValues', method: 'POST' },
		{ name: NotionEndpointsV3.getSpaces, path: 'getSpaces', method: 'POST' },
		{ name: NotionEndpointsV3.getSpace, path: 'getSpace', method: 'POST' },
	]
};

import { formatPageId } from './utils/pageIdFrormat';
const rootPageDir = formatPageId(process.env.NEXT_PUBLIC_NOTION_ROOT_PAGE);

notionAPI3Config.defaultParams = {
	loadPageChunk: {
		body: {
			pageId: rootPageDir,
			limit: 100,
			cursor: { stack: [] },
			chunkNumber: 0,
			verticalColumns: false
		}
	},
	getRecordValues: {
		body: {
			pageId: rootPageDir,
			limit: 999,
			chunkNumber: 0,
			cursor: { stack: [] },
			verticalColumns: false
		}
	},
	getCollection: {},
};

export default class NotionAPIV3 extends API<NotionEndpointsV3> {
	constructor() {
		super(notionAPI3Config);
	}
}
