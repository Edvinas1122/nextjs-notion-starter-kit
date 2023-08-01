import NotionAPI from './V1';
import NotionAPIV3 from './V3';
import NotionService from './NotionService';
import NotionController from './NotionController';
import NotionServiceV3 from './NotionServiceV3';

export default function NotionFactory() {
    const apiV3 = new NotionAPIV3();
    // const api = new NotionAPI();
    const serviceV3 = new NotionServiceV3(apiV3);
    // const service = new NotionService(api);
    const controller = new NotionController(serviceV3);

    return controller;
}