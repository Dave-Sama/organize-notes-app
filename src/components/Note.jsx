import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
function Note(props) {
	const onDelete = async () => {
		await axios.delete(`/delete/${props.id}`);
	};

	return (
		<div className='note'>
			<h1 id='title'>{props.title}</h1>
			<p>{props.content}</p>
			<button onClick={onDelete}>
				<DeleteForeverIcon />
			</button>
		</div>
	);
}

export default Note;
