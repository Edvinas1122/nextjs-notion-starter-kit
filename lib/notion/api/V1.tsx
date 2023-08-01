import API, { APIInfo, DefaultParams } from '@/lib/modules/api_wrapper';

export enum NotionEndpoints {
    getPage = 'getPage',
    getBlockChildren = 'getBlockChildren',
    getBlock = 'getBlock',
    getDatabase = 'getDatabase',
    queryDatabase = 'queryDatabase',
    getPagePropertyItem = 'getPagePropertyItem',
    search = 'search',
}

const notionAPIConfig: APIInfo = {
    name: 'NotionAPI',
    apiBaseUrl: 'https://api.notion.com/v1/',
    headers: {
        'Notion-Version': '2022-06-28',
        'Authorization': `Bearer ${process.env.ACCESS_API_KEY}`, // Assuming authToken is available in the scope.
    },
    endpoints: [
        { name: 'getPage', path: 'pages/:pageId', method: 'GET' },
        { name: 'getBlockChildren', path: 'blocks/:blockId/children', method: 'GET' },
        { name: 'getBlock', path: 'blocks/:blockId', method: 'GET' },
        { name: 'getDatabase', path: 'databases/:databaseId', method: 'GET' },
        { name: 'queryDatabase', path: 'databases/:databaseId/query', method: 'POST' },
        { name: 'getPagePropertyItem', path: 'pages/:pageId/properties/:propertyId', method: 'GET' },
        { name: 'search', path: 'search', method: 'POST' },
    ],
};

const rootPageDir = process.env.NEXT_PUBLIC_NOTION_ROOT_PAGE;

notionAPIConfig.defaultParams = {
    getPage: {
        params: { pageId: rootPageDir },
    },
    getBlockChildren: {
        params: { blockId: rootPageDir },
        body: { count: 200 },
    },
    getBlock: {
        params: { blockId: rootPageDir },
    },
    search: {
        body: {
            query: '',
            sort: {
                direction: 'ascending',
                timestamp: 'last_edited_time',
            },
            filter: {
                value: 'page',
                property: 'object',
            },
        },
    },
};

export default class NotionAPI extends API<NotionEndpoints> {
    constructor() {
        super(notionAPIConfig);
    }
}
