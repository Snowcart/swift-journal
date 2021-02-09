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
			if (pagesFromStorage) setPagesState([...pagesFromStorage]);
		}
	}, [pages]);

	const setPage = React.useCallback(
		(date: string, updatedThoughts: Thought[]): void => {
			// if page exists, edit it
			if (pages?.some((x) => x.date === date)) {
				const removedWrongThoughts = updatedThoughts.filter((x) => x.value || x.value === '');
				pages.find((x) => x.date === date).thoughts = removedWrongThoughts;
				setPagesState([...pages]);
			} else {
				// add new page
				const newPage = [{ date, thoughts: updatedThoughts }];
				setPagesState([...newPage]);
			}
		},
		[pages]
	);

	const newPage = React.useCallback(
		(date: string) => {
			const pagesFromStorage = getPagesFromStorage();
			const copyOfPages = [...pagesFromStorage];
			copyOfPages.push({ date, thoughts: [] });
			setPagesState([...copyOfPages]);
			savePages();
		},
		[pages]
	);

	const savePages = React.useCallback((): void => {
		setPagesInStorage(pages);
	}, [pages]);

	return { pages, setPage, newPage, savePages };
};
