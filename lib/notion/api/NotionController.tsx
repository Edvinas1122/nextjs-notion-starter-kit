import NotionService from './NotionServiceV3';
import { extractCollectionViewInfo, combineData } from './utils/notionUtils';

export default class NotionController {
	constructor(private notionService: NotionService) {}
  
	async getPageData(pageId?: string) {

		const contents = await this.notionService.getPageContents(pageId);
		const collectionViewInfo = extractCollectionViewInfo(contents);
		const collections = await Promise.all(collectionViewInfo.map(ids => 
			this.notionService.getCollection(
				ids.collectionViewId,
				ids.collectionId,
			)
		));
		const completePageData = combineData(contents, collections, collectionViewInfo);
		console.log(completePageData);
		return collections;
	
		// return completePageData;
	}
}
  