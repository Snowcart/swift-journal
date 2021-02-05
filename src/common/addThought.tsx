import * as React from 'react';
import { useContext } from 'react';
import { pagesContext } from '../context/PagesContext';

const AddThought = (props: Props) => {
	const context = useContext(pagesContext);
	const [popupShowing, setPopupShowing] = React.useState(false);

	const onAddThoughts = (type: 'text' | 'title') => {
		console.log(props.index);
		const thought = { type, value: '' };
		const currentPage = context.pages.find((x) => x.date === props.date);
		currentPage.thoughts.splice(props.index, 0, thought);
		context.setPage(props.date, [...currentPage.thoughts]);
		setPopupShowing(false);
	};

	const addingThoughts = (
		<>
			<div onClick={() => onAddThoughts('title')}>Title!</div>
			<div onClick={() => onAddThoughts('text')}>Text!</div>
		</>
	);

	return (
		<>
			<div onClick={() => setPopupShowing(!popupShowing)}>--+</div>
			{popupShowing && addingThoughts}
		</>
	);
};

export default AddThought;

interface Props {
	index: number;
	date: string;
}
