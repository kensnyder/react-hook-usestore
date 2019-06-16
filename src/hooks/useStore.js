// inspired by https://github.com/jhonnymichel/react-hookstore/blob/6d23d2fcb0e7cf8a3929a01e0c543fe5e05ecf05/src/index.js
import { useState, useEffect } from 'react';
import forOwn from 'lodash.forown';
import isPromise from 'is-promise';

/**
 * Creates a new store
 * @param {Object} [config] - An object containing the store setup
 * @property {Object} [config.state] - The store initial state. It can be of any type.
 * @property {Object} [config.actions] - Named functions that can be dispatched by name and payload.
 * @property {Function|String|Boolean} [config.debug] - True or string to console.log state each time it is set; If function, call with state each time it is set
 * @return {Object} - Info and methods for working with the store
 * @property {Object} state - The current value of the state
 * @property {Object} actions - The named functions that were passed in to begin with
 * @property {Function<String,*>} dispatch - A function that takes an action name and a payload
 * @property {Function<Function|*>} setState - A function that will set state directly across all components that useStore()
 * @property {Function[]} _setters - A list of setters that were added using useStore()
 */
export function createStore({ state = {}, actions = {} }) {
	const store = {
		state,
		actions: {},
		reset: () => _setAll(state),
		_setters: [],
		_subscribe,
		_unsubscribe,
		_setAll,
	};

	forOwn(actions, (action, name) => {
		store.actions[name] = (...args) => {
			const newState = action(store.state, ...args);
			if (isPromise(newState)) {
				newState.then(_setAll, () => {});
			} else {
				_setAll(newState);
			}
		};
	});

	return store;

	function _subscribe(setState) {
		if (!store._setters.includes(setState)) {
			store._setters.push(setState);
		}
	}

	function _unsubscribe(setState) {
		store._setters = store._setters.filter(setter => setter !== setState);
	}

	function _setAll(newState) {
		store._setters.forEach(setter => setter(newState));
		store.state = newState;
	}
}

/**
 * @param {Object} store - A store created with createStore()
 * @return {Object} - tools for working with the store
 * @property {*} state - The values in the store
 * @property {Function<String,*>} dispatch - Method to dispatch a named function with the given payload
 * @property {Function<Function|*>} setState - Method to update state directly
 */
export function useStore(store) {
	const [state, setState] = useState(store.state);

	useEffect(() => {
		store._subscribe(setState);
		return store._unsubscribe.bind(setState);
	}, [store]);

	return {
		state,
		actions: store.actions,
		reset: store.reset,
	};
}
