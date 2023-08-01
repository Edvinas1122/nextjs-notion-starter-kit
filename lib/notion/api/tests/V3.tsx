import  NotionAPIV3, {NotionEndpointsV3} from '../V3';
// import { NotionAPI } from './raw';
import { formatPageId } from '../utils/pageIdFrormat';
import NotionFactory from '../NotionFactory';

interface Block {

}

// interface CollectionInfo {

// }


async function TestAPI3() {
	const notion = NotionFactory();
	const adjustedPageId = formatPageId(process.env.NEXT_PUBLIC_NOTION_ROOT_PAGE);
	
	const blocks = await notion.getPageData();

	// 284070b6-3f42-4957-883f-95fd06a3bc81 collectionViewId 14310980-ce4d-4d25-b9ee-2b302782a579


  return <div>testAPI</div>;
}

export default TestAPI3;