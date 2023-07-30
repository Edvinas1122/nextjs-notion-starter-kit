import { Icon } from "../block/icon";
import Image from 'next/image';
import CoverView from "./cover";

interface Page {
	id: string;
	created_time: string;
	last_edited_time: string;
	created_by: {object: string, id: string};
	last_edited_by: {object: string, id: string};
	cover: {
		type: string,
		page_cover: {
			type: string,
			file: File,
		},
		icon: Icon,
	},
	parent: any;
	archived: boolean;
	properties: { [key: string]: any };
	url: string;
	public_url: string;
}

interface PageViewProps {
	page: Page;
	children: any;
}

function TitleIcon({
	icon
}: {
	icon: Icon
}): any
{
	return (
		<div className="notion-page-icon-hero notion-page-icon-image">
			<span>
				<Image
					src={icon.file.url}
					// fill={true}
					width={120}
					height={120}
					alt="icon"
				/>
			</span>
		</div>
	);
}

export default function NotionPageView({
	page,
	children,
}: PageViewProps ): any
{
	console.log(page);
	const cover = page.cover;
	const icon = page.icon;
	return (
		<div className="notion-page-scroller">
			<CoverView
				cover={cover}
			/>
			<main className="notion-page
				notion-page-has-cover
				notion-page-has-icon
				notion-page-has-image-icon
				notion-full-page
				index-page"
			>
			<TitleIcon
				icon={icon}
			/>
			{children}
			</main>
		</div>
	);
}