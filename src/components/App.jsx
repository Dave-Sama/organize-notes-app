import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
	const [notes, setNotes] = useState([]);

	useEffect(async () => {
		// get data from backend HERE!
		await axios
			.get('/notes')
			.then(({ data }) => {
				setNotes(() => [...data]);
			})
			.catch((err) => console.log(err));
	}, [notes]);

	return (
		<div>
			<Header />
			<CreateArea />
			<div className='flex-container'>
				{notes.map((noteItem, index) => {
					return (
						<Note
							key={index}
							id={noteItem._id}
							title={noteItem.title}
							content={noteItem.content}
						/>
					);
				})}
			</div>
			<Footer />
		</div>
	);
}

export default App;
