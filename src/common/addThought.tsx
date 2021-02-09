import * as React from 'react';
import { useContext } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
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
		// eslint-disable-next-line no-alert
		if (confirm('Are you sure you want to delete this thought?')) {
			currentPage.thoughts.splice(props.index, 1);
			context.setPage(props.date, [...currentPage.thoughts]);
			setPopupShowing(false);
		}
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
				<TitleDiv>add thought</TitleDiv>
				<SelectionSection>
					<RoundDiv onClick={() => onAddThoughts('title')}>
						<img src={titleField} alt="T" />
						<label>Add title</label>
					</RoundDiv>
					<RoundDiv onClick={() => onAddThoughts('text')}>
						<img src={textField} alt="Tt" />
						<label>Add text</label>
					</RoundDiv>
				</SelectionSection>
				<AddThoughtButtonGroup disableElevation>
					<AddThoughtButton onClick={() => setPopupShowing(false)} type="button">
						Cancel
					</AddThoughtButton>
					{currentPage.thoughts.length !== props.index && (
						<AddThoughtButtonBad type="button" onClick={() => deleteThought()}>
							Delete
						</AddThoughtButtonBad>
					)}
				</AddThoughtButtonGroup>
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

const SelectionSection = styled.section`
	width: 100%;
`;

const TitleDiv = styled.div`
	width: 100%;
	height: 24px;
	border-bottom: 1px solid black;
	line-height: 24px;
	text-align: center;
	background-color: rgba(0, 110, 255, 0.6);
	border-radius: 10px 10px 0 0;
`;

const AddThoughtIcon = styled.div`
	float: right;
	margin-right: 15px;
`;

const AddThoughtPopupWrapper = styled.div`
	float: right;
`;

const RoundDiv = styled.div`
	width: 46px;
	border: 1px solid black;
	border-radius: 32px;
	display: inline-block;
	margin: 46px calc(25% - 48px / 2);
	height: 46px;
	img {
		margin: auto;
		margin-left: calc(50% - 16px);
		margin-top: calc(50% - 16px);
		height: 32px;
		width: 32px;
	}
	label {
		font-size: 12px;
	}
`;

const AddThoughtPopup = styled.div`
	position: fixed;
	bottom: 0;
	margin: 0;
	left: calc(50% - 85% / 2);
	width: 85%;
	//height: 220px;
	background-color: rgba(0, 110, 255, 0.4);
	border-bottom: none;
	z-index: 12;
	border-radius: 10px 10px 0 0;

	@media (min-width: 818px) {
		position: absolute;
		width: 320px;
		bottom: inherit;
		top: inherit;
		left: inherit;
		right: inherit;
		height: 100px;
		border-radius: 10px;
	}
`;

const AddThoughtButton = styled(Button)`
	width: 100%;
	// need to override material
	border: none;
	background-color: rgba(0, 110, 255, 0.6) !important;
`;

const AddThoughtButtonBad = styled(AddThoughtButton)`
	// override material
	background-color: #ff8f8f !important;
`;

const AddThoughtButtonGroup = styled(ButtonGroup)`
	width: 100%;
	height: 40px;
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
