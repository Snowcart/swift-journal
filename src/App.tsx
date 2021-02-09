import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { pagesContext } from './context/PagesContext';
import { usePagesContext } from './hooks/usePagesContext';
import Page from './pages/page';

export default () => {
	const GlobalStyle = createGlobalStyle`
	html { 
		height: 100%;
	}
	body { 
		height: 100%;
		margin: 0;
		background-color: white;
		@media(min-width: 816px) {
			background-color: rgb(254,253,251);
		}
	}
	#app { 
		height: 100%;
	}

	`;

	const pages = usePagesContext();

	return (
		<>
			<GlobalStyle />
			<pagesContext.Provider value={pages}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Page} />
						<Route exact path="/:date" component={Page} />
					</Switch>
				</BrowserRouter>
			</pagesContext.Provider>
		</>
	);
};
