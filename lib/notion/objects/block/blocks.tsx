import handleCallout from "./callout";

type BlockHandler = (block: any) => any;

const blockHandlers: { [key: string]: BlockHandler } = {
	"callout": handleCallout,
	"child_database": handleChildDatabase,
	// "Bookmark": handleBookmark,
	// "Breadcrumb": handleBreadcrumb,
	// "Bulleted list item": handleBulleted,
	// "Child page": handleChild_page,
	// "Code": handleCode,
	// "Column list and column": handleColumn_list,
	// "Divider": handleDivider,
	// "Embed": handleEmbed,
	// "Equation": handleEquation,
	// "File": handleFile,
	// "Headings": handleHeadings,
	// "Image": handleImage,
	// "Link Preview": handleLink,
	// "Mention": handleMention,
	// "Numbered list item": handleNumbered,
	// "Paragraph": handleParagraph,
	// "PDF": handlePDF,
	// "Quote": handleQuote,
	// "Synced block": handleSynced,
	// "Table": handleTable,
	// "Table of contents": handleTable,
	// "Template": handleTemplate,
	// "To do": handleTo,
	// "Toggle blocks": handleToggle,
	// "Video": handleVideo,
};

export default function handleBlock(block: any): any {
	const handler = blockHandlers[block.type];
	if (!handler) {
	  console.warn(`No handler for block type ${block.type}`);
	  return;
	}
	return handler(block);
}

interface ChildDatabase {
	title: string;

}

function handleChildDatabase(block: any): any {
	const childDatabase: ChildDatabase = block.child_database;

	return (
		<div>
			Child Database
			{childDatabase.title}
		</div>
	);

}

