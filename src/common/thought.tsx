import * as React from 'react';
import styled from 'styled-components';
import { pagesContext } from '../context/PagesContext';

const Thought = ({ type, value, editing, today, index }: Props) => {
	const context = React.useContext(pagesContext);

	const updatePage = (e: any) => {
		if (context.pages.some((x) => x.date === today)) {
			context.pages.find((x) => x.date === today).thoughts[index].value = e.target.value;
			context.setPage(today, [...context.pages.find((x) => x.date === today).thoughts]);
		}
	};
	if (!editing) {
		if (type === 'title') return <TitleThought>{value}</TitleThought>;
		if (type === 'text') return <TextThought>{value}</TextThought>;
	}

	if (type === 'title') {
		return <EditTitleThought onBlur={() => context.savePages()} onChange={updatePage} value={value} />;
	}

	if (type === 'text') {
		return <EditTextThought onBlur={() => context.savePages()} onChange={updatePage} value={value} />;
	}
	return null;
};

export default Thought;

interface Props {
	type: string;
	value: string;
	editing: boolean;
	today: string;
	index: number;
}

const EditTitleThought = styled.input`
	border: none;
	font-size: 24px;
	margin: 0;
	width: 100%;
	overflow: auto;
	text-align: center;
	:focus {
		border: solid 1px rgba(0, 225, 255, 0.1) !important;
	}
`;

const EditTextThought = styled.textarea`
	width: 100%;
	min-height: 30px;
	font-size: 16px;
	max-width: 816px;
`;

const TitleThought = styled.h2`
	margin: auto;
`;
const TextThought = styled.p``;
