import React from 'react';
import { useStore } from '../hooks/useStore.js';
import { storyStore } from '../stores/storyStore.js';

export function StoryToolbar() {
	const { state, actions, reset } = useStore(storyStore);

	return (
		<div className="StoryToolbar Component">
			<button
				className={state.view === 'list' ? 'selected' : ''}
				onClick={actions.showList}
			>
				List
			</button>
			<button
				className={state.view === 'grid' ? 'selected' : ''}
				onClick={actions.showGrid}
			>
				Grid
			</button>
			<input
				value={state.searchTerm}
				onChange={actions.search}
				size="40"
				placeholder="Filter..."
			/>
			<button className="reset" onClick={reset}>
				[reset]
			</button>
		</div>
	);
}
