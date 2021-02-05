import styled from 'styled-components';
import { format } from 'date-fns';
import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { DateString } from '../core/constants';
import DateDisplay from '../common/date';
import { pagesContext } from '../context/PagesContext';
import Thought from '../common/thought';
import { Thought as ThoughtModel } from '../models/thought';

const Page = () => {
	const history = useHistory();
	const params = useParams<{ date: string }>();
	const context = React.useContext(pagesContext);
	const today = format(new Date(), DateString);
	let date: string;
	if (params.date === null || params.date === 'today') {
		date = today;
	} else {
		const paramDate = new Date(params.date);
		date = format(paramDate, DateString);
	}
	const currentPage = context.pages.find((x) => x.date === date);
	if (!currentPage && date !== today) history.push('/today');
	if (!currentPage && date === today) {
		// will this trigger a re-render?
		context.pages.push({ date, thoughts: [{} as ThoughtModel] });
	}
	return (
		<PageSection>
			<DateWrapper>
				<DateDisplay />
			</DateWrapper>
			<ThoughtsWrapper>
				{currentPage.thoughts.map((thought, i) => {
					return <Thought type={thought.type} value={thought.value} today={today} index={i} editing />;
				})}
			</ThoughtsWrapper>
		</PageSection>
	);
};

interface Props {
	pageDate?: string;
}

export default Page;

const PageSection = styled.section`
	margin: auto;
	width: 100%;
	height: 100%;
	background-color: white;
	@media (min-width: 816px) {
		width: 816px;
	}
`;

const DateWrapper = styled.div`
	width: 100%;
	text-align: right;
	padding-right: 5px;
	margin-right: 5px;
`;
const ThoughtsWrapper = styled.div`
	width: 100%;
	margin-top: 15px;
`;
