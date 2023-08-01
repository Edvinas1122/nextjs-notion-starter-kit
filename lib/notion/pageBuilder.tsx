// import { notion } from "./api/V1";
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


import NotionAPI, { NotionEndpoints } from "./api/V1";
import NotionAPIV3, { NotionEndpointsV3 } from "./api/V3";
import TestAPI from "./api/tests/V1";
import TestAPI3 from "./api/tests/V3";


export default async function NotionPageData() {

	// const notionPage = notionPageBuilder({
	// 	blocks: blocks.results,
	// 	page: page,
	// });

	return (
		<>
			 {/* <TestAPI /> */}
			 <TestAPI3 />
			{/* <PageSamepe recordMap={page} /> */}
			{/* {
				notionPage
			} */}
		</>
	);
}
