import React from 'react';
import { useStore } from '../hooks/useStore.js';
import { StoryItem } from './StoryItem.js';
import { storyStore } from '../stores/storyStore.js';

export function StoryArea() {
	const { state } = useStore(storyStore);

	return (
		<div className="StoryArea Component">
			{state.stories &&
				state.stories.map((story, i) => (
					<StoryItem story={story} key={i} />
				))}
		</div>
	);
}
