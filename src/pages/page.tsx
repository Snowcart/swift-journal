import styled from 'styled-components';
import { format } from 'date-fns';
import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { DateString } from '../core/constants';
import DateDisplay from '../common/date';
import { pagesContext } from '../context/PagesContext';
import Thought from '../common/thought';
import { Thought as ThoughtModel } from '../models/thought';
import AddThought from '../common/addThought';
import { Pages } from '../models/pages';
import Calendar from './calendar';
// TODO: buddy clean up this page
const Page = () => {
	const history = useHistory();
	const params = useParams<{ date: string }>();
	const context = React.useContext(pagesContext);
	const today = format(new Date(), DateString);
	let date: string;
	let currentPage: Pages;
	if (!params.date || params.date === 'today') {
		date = today;
	} else {
		try {
			const paramDate = new Date(params.date);
			date = format(paramDate, DateString);
		} catch {
			history.push('/today');
		}
	}
	const isEditing = date === today;

	if (context.pages !== undefined) {
		currentPage = context?.pages?.find((x) => x.date === date);
		if (!currentPage && date !== today) history.push('/today');
		if (!currentPage && date === today) {
			// create new page
			context.newPage(date);
		}
	}

	const thoughts = currentPage && [...currentPage?.thoughts];
	if (!currentPage) return null;
	return (
		<PageSection>
			<Calendar />
			<DateWrapper>
				<DateDisplay date={date} />
			</DateWrapper>
			<ThoughtsWrapper>
				{thoughts.map((thought, i) => {
					return (
						<>
							{isEditing && <AddThought index={i} date={date} key={`addThought-${i}`} />}
							<Thought
								type={thought.type}
								value={thought.value}
								today={today}
								index={i}
								editing={date === today}
								key={`thought-${i}`}
							/>
						</>
					);
				})}
				{isEditing && <AddThought index={currentPage.thoughts.length} date={date} />}
			</ThoughtsWrapper>
		</PageSection>
	);
};

export default Page;

const PageSection = styled.section`
	margin: auto;
	width: 95%;
	height: 100%;
	overflow: auto;
	overflow-x: hidden;
	background-color: white;
	scrollbar-width: none; // Firefox
	::-webkit-scrollbar {
		display: none;
	}
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
