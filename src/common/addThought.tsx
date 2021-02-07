import * as React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { pagesContext } from '../context/PagesContext';
import addCircleSvg from '../icons/add-circle.svg';
import titleField from '../icons/title-field.svg';
import textField from '../icons/text-field.svg';

const AddThought = (props: Props) => {
	const context = useContext(pagesContext);
	const currentPage = context.pages.find((x) => x.date === props.date);
	const [popupShowing, setPopupShowing] = React.useState(false);

	const deleteThought = () => {
		currentPage.thoughts.splice(props.index, 1);
		context.setPage(props.date, [...currentPage.thoughts]);
		setPopupShowing(false);
	};

	const onAddThoughts = (type: 'text' | 'title') => {
		const thought = { type, value: '' };
		currentPage.thoughts.splice(props.index, 0, thought);
		context.setPage(props.date, [...currentPage.thoughts]);
		setPopupShowing(false);
	};

	const addingThoughts = (
		<AddThoughtPopupWrapper>
			<AddThoughtOverlay onClick={() => setPopupShowing(false)} />
			<AddThoughtPopup>
				<RoundDiv onClick={() => onAddThoughts('title')}>
					<img src={titleField} alt="T" />
				</RoundDiv>
				<RoundDiv onClick={() => onAddThoughts('text')}>
					<img src={textField} alt="Tt" />
				</RoundDiv>
				{currentPage.thoughts.length !== props.index && <div onClick={() => deleteThought()}>Delete</div>}
				<div onClick={() => setPopupShowing(false)}>Cancel</div>
			</AddThoughtPopup>
		</AddThoughtPopupWrapper>
	);

	return (
		<>
			<AddThoughtIcon onClick={() => setPopupShowing(true)}>
				<img src={addCircleSvg} alt="+" />
			</AddThoughtIcon>
			{popupShowing && addingThoughts}
		</>
	);
};

export default AddThought;

interface Props {
	index: number;
	date: string;
}

const AddThoughtIcon = styled.div`
	float: right;
`;

const AddThoughtPopupWrapper = styled.div`
	float: right;
`;

const RoundDiv = styled.div`
	width: 32px;
	border: 1px solid black;
	border-radius: 21px;
	display: inline-block;
	margin: 32px;
	height: 32px;
	img {
		margin: auto;
		margin-left: 7px;
		margin-top: 7px;
	}
`;

const AddThoughtPopup = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 120px;
	background-color: grey;
	z-index: 12;
	border-radius: 8px 8px 0 0;

	@media (min-width: 818px) {
		position: absolute;
		width: 320px;
		bottom: inherit;
		top: inherit;
		left: inherit;
		right: inherit;
		float: right;
	}
`;

const AddThoughtOverlay = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	opacity: 0.8;
	z-index: 11;
`;
