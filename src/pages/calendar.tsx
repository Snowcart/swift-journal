import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import format from 'date-fns/format';
import * as React from 'react';
import { pagesContext } from '../context/PagesContext';
import { DateString, DateUrlString } from '../core/constants';

const Calendar = () => {
	const [showCalendar, setCalendar] = React.useState(false);
	const context = React.useContext(pagesContext);
	const today = format(new Date(), DateString);
	const history = useHistory();

	const CalendarInfo = (
		<div>
			{context.pages
				.filter((x) => x.date)
				.reverse()
				.map((x) => {
					return (
						<li
							onClick={() => {
								history.push(`/${dateToDateUrl(x.date)}`);
								setCalendar(false);
							}}
						>
							{x.date === today ? 'return to today' : x.date}
						</li>
					);
				})}
		</div>
	);

	const SidePanelWithInfo = <SidePanel>{CalendarInfo}</SidePanel>;

	return (
		<>
			<CalendarButton onClick={() => setCalendar(!showCalendar)} /> {showCalendar && SidePanelWithInfo}{' '}
		</>
	);
};

export default Calendar;

const dateToDateUrl = (date: string) => {
	const dateParts = date.split(' ');
	dateParts[0] = dateParts[0].slice(0, -2);
	const urlDate = new Date(`${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`);
	return format(urlDate, DateUrlString);
};

const CalendarButton = styled.div`
	position: fixed;
	height: 32px;
	width: 32px;
	background-color: purple;
	top: 15px;
	left: 0;
	z-index: 14;
`;

const SidePanel = styled.div`
	position: fixed;
	width: 200px;
	height: 100%;
	border: 1px solid black;
	background-color: white;
	z-index: 13;
	overflow: scroll;
	li {
		margin: 15px;
	}
`;
