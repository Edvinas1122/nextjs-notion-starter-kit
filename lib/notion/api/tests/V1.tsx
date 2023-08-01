import NotionAPI, {NotionEndpoints} from '../V1';

async function TestAPI() {
	const notion = new NotionAPI();

	const blocks = await notion.getPage();
	console.log(blocks);

	const search = await notion.search('test');
	console.log(search);

  return <div>testAPI</div>;
}

export default TestAPI;