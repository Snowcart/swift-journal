import styled from 'styled-components';
import { format } from 'date-fns';
import * as React from 'react';

const DateDisplay = (props: Props) => {
	return <DateWrapper>{typeof props.date === 'string' ? props.date : format(props.date, 'do MMM y')}</DateWrapper>;
};

export default DateDisplay;

interface Props {
	date?: Date | string;
}

DateDisplay.defaultProps = {
	date: new Date()
};

const DateWrapper = styled.div`
	font-size: 12px;
	font-weight: bold;
`;
