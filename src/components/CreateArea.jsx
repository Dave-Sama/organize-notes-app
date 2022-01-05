import React, { useState } from 'react';
// import { Collapse } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom, Collapse } from '@mui/material';
function CreateArea(props) {
	const [note, setNote] = useState({
		title: '',
		content: '',
	});

	const [isExpended, setExpended] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;

		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});

		if (note.title !== '') {
			setExpended(true);
		}
	}

	function submitNote(event) {
		if (note.title !== '' && note.content !== '') {
			props.onAdd(note);
			setNote({
				title: '',
				content: '',
			});
		}
		event.preventDefault();
	}

	const expend = () => {
		if (note.title === '' && note.content === '') {
			setExpended(!isExpended);
		}
	};

	return (
		<div>
			<form className='create-note'>
				<input
					style={{ transition: 'all height .1s' }}
					onClick={expend}
					name='title'
					onChange={handleChange}
					value={note.title}
					placeholder='Title'
				/>
				{isExpended && (
					<Collapse in={isExpended}>
						<textarea
							name='content'
							onChange={handleChange}
							value={note.content}
							placeholder='Take a note...'
							rows='3'
						/>
					</Collapse>
				)}
				{isExpended && (
					<Zoom in={true}>
						<Fab onClick={submitNote}>
							<AddIcon />
						</Fab>
					</Zoom>
				)}
			</form>
		</div>
	);
}

export default CreateArea;
