import { notion } from "./api";
import handleBlock from "./objects/block/blocks";
import NotionPageView from "./objects/page/page";

interface notionBlock {
	id: string;
	type: string;
	// properties: {
	// 	title: string[];
	// };
	// content: notionBlock[];
}

interface BlocksViewProps {
	blocks: notionBlock[];
}

function BlocksView({
	blocks
}: BlocksViewProps
) {
	return blocks.map((block) => {
		return (
			<div key={block.id}>
				{handleBlock(block)}
			</div>
		);
	});
}

export const notionPageBuilder = ({
	blocks,
	page,
}: {
	blocks: notionBlock[];
	page: any;
}) => {

	return (
		<div>
			<NotionPageView
				page={page}
				children={
					<BlocksView
						blocks={blocks}
					/>
				}
			/>
		</div>
	);
}

export default async function NotionPageData() {

	const page = await notion.getPageInfo();
	const blocks = await notion.getPageBlocks();
	const notionPage = notionPageBuilder({
		blocks: blocks.results,
		page: page,
	}); // if object list or not empty

	return (
		<>
			{
				notionPage
			}
		</>
	);
}