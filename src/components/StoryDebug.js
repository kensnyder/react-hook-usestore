import React from 'react';
import { useStore } from '../hooks/useStore.js';
import { storyStore } from '../stores/storyStore.js';

export function StoryDebug() {
	const { state } = useStore(storyStore);

	return (
		<div className="Component StoryDebug">
			<h3>Debug State:</h3>
			<pre>{JSON.stringify(state, null, 4)}</pre>
		</div>
	);
}
