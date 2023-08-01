/**
	* Extract collection view IDs from the page contents.
	* This is just a placeholder, replace the implementation with your actual logic.
*/

interface CollectionIDs {
	collectionViewId: string;
	collectionId: string;
	collectionView: any;
}

function makeCollectionInfos(collectionViewIDs: string[][], contents) {
	let collectionViewInfo: CollectionIDs[] = [];

	for (const collectionViewID of collectionViewIDs) {

		const collectionView = contents.recordMap.collection_view[collectionViewID[1]];
		const collectionId = collectionView?.value?.id;
		if (collectionId) {
			collectionViewInfo.push({
				collectionViewId: collectionViewID[0],
				collectionId: collectionId,
				collectionView: collectionView.value
			});
		}
	}
	return collectionViewInfo;
}

function makeGroupedIDsArray(collectionViewInfo: any[]): string[][] {
    let groupedIDs: string[][] = [];
    
    for (let i = 0; i < collectionViewInfo.length; i += 2) {
		if (collectionViewInfo[i + 1] !== undefined) {
            let pair = [collectionViewInfo[i + 1].collection_id, collectionViewInfo[i].view_ids[0]];
            groupedIDs.push(pair);
        }
    }
    return groupedIDs;
}

export function extractCollectionViewInfo(contents) {

	if (!contents.recordMap?.collection) {
		return [];
	}
	const block_values = Object.values(contents.recordMap.block).map(obj => obj.value);
	const collectionValues = Object.values(
		block_values.filter((value) => 
			value.type === 'collection_view_page' || value.type === 'collection_view'
	));

	const collectionViewIDs: string[][] = makeGroupedIDsArray(collectionValues);
	return makeCollectionInfos(collectionViewIDs, contents);
}

/**
	* Combine the contents and collections into a single data structure.
	* This is just a placeholder, replace the implementation with your actual logic.
*/
export function combineData(contents, collections, collectionViewInfo) {
	console.log('collectionViewInfo', collectionViewInfo);
	const block_values = Object.values(contents.recordMap.block).map(obj => obj.value);
	let combinedData = [...block_values, ...collections];

    return combinedData;
}