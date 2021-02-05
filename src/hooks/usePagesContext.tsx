import * as React from 'react';
import { useState } from 'react';
import { getPagesFromStorage, setPagesInStorage } from '../core/localStorageService';
import { PagesContext } from '../context/PagesContext';
import { Pages } from '../models/pages';
import { Thought } from '../models/thought';

// eslint-disable-next-line import/prefer-default-export
export const usePagesContext = (): PagesContext => {
	const [pages, setPagesState] = useState<Pages[]>();

	React.useEffect(() => {
		if (!pages) {
			const pagesFromStorage = getPagesFromStorage();
			if (pagesFromStorage) setPagesState(pagesFromStorage);
		}
	}, []);

	const setPage = React.useCallback((date: string, updatedThoughts: Thought[]): void => {
		// if page exists, edit it
		if (pages.some((x) => x.date === date)) {
			pages.find((x) => x.date === date).thoughts = updatedThoughts;
		} else {
			// add new page
			pages.push({ date, thoughts: updatedThoughts });
		}
	}, []);

	const savePages = React.useCallback((): void => {
		setPagesInStorage(pages);
	}, []);

	return { pages, setPage, savePages };
};
