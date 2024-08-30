export const randomId = (): string => {
	const characters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let id = '';
	for (let i = 0; i < 6; i++) {
		id += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return id;
};