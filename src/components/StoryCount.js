import React from 'react';
import { useStore } from '../hooks/useStore.js';
import { storyStore } from '../stores/storyStore.js';

export function StoryCount() {
	const { state } = useStore(storyStore);

	const num = state.stories ? state.stories.length : 0;

	return <div className="StoryCount Component">Showing {num} stories.</div>;
}
