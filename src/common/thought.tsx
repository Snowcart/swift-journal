import * as React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
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
		if (type === 'title')
			return (
				<EditTextWrapper>
					<TitleThought>{value}</TitleThought>
				</EditTextWrapper>
			);
		if (type === 'text')
			return (
				<EditTextWrapper>
					<TextThought>{value}</TextThought>
				</EditTextWrapper>
			);
	}

	if (type === 'title') {
		return (
			<EditTextWrapper>
				<EditTitleThought onBlur={() => context.savePages()} onChange={updatePage} value={value} />
			</EditTextWrapper>
		);
	}

	if (type === 'text') {
		return (
			<EditTextWrapper>
				<EditTextThought onBlur={() => context.savePages()} onChange={updatePage} value={value} />
			</EditTextWrapper>
		);
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

const EditThought = styled(TextareaAutosize)`
	width: 100%;
	overflow: hidden;
	outline: none;
	resize: none;
	border: none;
	max-width: 816px;
	:focus {
		outline: none;
	}
`;
const EditTitleThought = styled(EditThought)`
	font-size: 24px;
	margin: 0;
	text-align: center;
`;

const EditTextWrapper = styled.div`
	width: 100%;
	max-width: vw;
`;

const EditTextThought = styled(EditThought)`
	min-height: 30px;
	height: auto;
	font-size: 16px;
`;

const TitleThought = styled.h2`
	font-size: 24px;
	margin: 0;
	text-align: center;
	overflow-wrap: break-word;
`;
const TextThought = styled.p`
	overflow-wrap: break-word;
`;
