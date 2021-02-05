import styled from 'styled-components';
import { format } from 'date-fns';
import * as React from 'react';

const DateDisplay = (props: Props) => {
	const today = new Date();
	const date = props.date ?? today;

	return <DateWrapper>{format(date, 'do MMM y')}</DateWrapper>;
};

export default DateDisplay;

interface Props {
	date?: Date;
}

DateDisplay.defaultProps = {
	date: null
};

const DateWrapper = styled.div`
	font-size: 12px;
	font-weight: bold;
`;
