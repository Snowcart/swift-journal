import { Pages } from '../models/pages';

const pagesKey = 'pages';

export const getPagesFromStorage = () => {
	const rawPageData = localStorage.getItem(pagesKey);
	if (!rawPageData) return {} as Pages[];
	try {
		return JSON.parse(rawPageData);
	} catch (e) {
		console.error(`Failed to parse JSON from storage: ${rawPageData}`);
		return {} as Pages[];
	}
};

export const setPagesInStorage = (pages: Pages[]) => localStorage.setItem(pagesKey, JSON.stringify(pages));
