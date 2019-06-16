import { createStore } from '../hooks/useStore.js';

const data = getFakeData();
const state = {
	stories: data,
	view: 'list',
	searchTerm: '',
	unused: 'foo',
};
const actions = {
	search,
	showList,
	showGrid,
};

export const storyStore = createStore({ state, actions });

function showList(state) {
	return { ...state, view: 'list' };
}

function showGrid(state) {
	return { ...state, view: 'grid' };
}

export function search(state, evt) {
	const searchTerm = evt.target.value;
	const lowerSearchTerm = searchTerm.toLocaleLowerCase();
	const stories = data.filter(story => {
		return story.title.toLocaleLowerCase().indexOf(lowerSearchTerm) > -1;
	});
	return { ...state, searchTerm, stories };
}

function getFakeData() {
	return [
		{
			title: 'Climb that mountain and join your friends',
			descr: getFakeText(20),
			image: 'https://picsum.photos/250/150',
		},
		{
			title: "Old farmer's car in good style",
			descr: getFakeText(28),
			image: 'https://picsum.photos/250/151',
		},
		{
			title: 'Imposing mountain and lake',
			descr: getFakeText(42),
			image: 'https://picsum.photos/250/152',
		},
		{
			title: 'Waves dashing onto a beach',
			descr: getFakeText(18),
			image: 'https://picsum.photos/250/153',
		},
		{
			title: 'Inside a blue lake whirlpool',
			descr: getFakeText(46),
			image: 'https://picsum.photos/250/154',
		},
		{
			title: 'Flowers in a green forest',
			descr: getFakeText(38),
			image: 'https://picsum.photos/250/155',
		},
		{
			title: 'Capital building across lake',
			descr: getFakeText(35),
			image: 'https://picsum.photos/250/156',
		},
		{
			title: 'Sticks and stones all piled and pretty',
			descr: getFakeText(41),
			image: 'https://picsum.photos/250/157',
		},
	];
}

function getFakeText(numWords) {
	const lorem =
		'dolor sit amet, consectetur adipiscing elit. Sed quis sem viverra, porttitor diam nec, ullamcorper ex. Nam mi dolor, malesuada eu feugiat hendrerit, pulvinar sed eros. Aliquam nec placerat nisi. Nulla non scelerisque ex. Sed blandit finibus tellus, nec convallis tortor viverra eget. Nam diam ex, interdum a est id, scelerisque tempus magna. Quisque accumsan nisl ut arcu tincidunt, et sollicitudin purus feugiat. Curabitur eget rhoncus erat. Maecenas rutrum tortor in ligula pharetra, vitae pharetra enim sagittis. Donec vestibulum eu tortor dictum rutrum. Nunc accumsan lorem sit amet euismod tincidunt. Nullam sit amet ante sit amet urna egestas iaculis in sed purus. Aenean eget arcu mi. Donec dignissim libero sed felis maximus aliquam. Integer fermentum massa nec commodo placerat. Sed vitae cursus leo, et hendrerit elit. Duis sed diam ante. Phasellus id varius nisi, id placerat urna. Fusce consectetur ex sed leo semper, id malesuada tellus finibus. Suspendisse faucibus ex et nisi pulvinar dictum. Nulla mollis rhoncus mi. Sed et justo massa. Sed fringilla ex eu gravida porta. Nulla nisi orci, pharetra a diam in, efficitur consequat libero. Nam venenatis sagittis leo in malesuada. Integer nec lobortis diam. Phasellus volutpat, risus a porta efficitur, mauris eros aliquet mauris, vel maximus augue purus ac sapien. Quisque vitae ligula mauris. Phasellus nec luctus libero. Suspendisse feugiat, nunc quis auctor lacinia, mauris urna fringilla eros, at aliquet ex ante at felis. In sed leo non ex semper dictum.';
	const words = lorem.split(' ');
	const randStart = Math.floor(Math.random() * 10);
	return 'Lorem ipsum ' + words.slice(randStart, numWords).join(' ');
}
