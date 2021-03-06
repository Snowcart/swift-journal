import * as React from 'react';
import { Pages } from '../models/pages';
import { Thought } from '../models/thought';

export interface PagesContext {
	pages: Pages[];
	setPage: (date: string, thoughts: Thought[]) => void;
	newPage: (date: string) => void;
	savePages: () => void;
}

export const defaultPagesContext = {
	pages: [{}] as Pages[],
	setPage: () => {},
	newPage: () => {},
	savePages: () => {}
};

export const pagesContext = React.createContext<PagesContext>(defaultPagesContext);
