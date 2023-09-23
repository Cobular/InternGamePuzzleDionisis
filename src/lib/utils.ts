import { animals, colors } from './references';

export function positive_response(): string {
	return random_from_list([
		'Ooh that sounds really good!',
		'Yum!',
		"That's my favorite!",
		'I love that!',
		"That's a great choice!",
		'What a good drink.',
		"I'll have what you're having!"
	]);
}

export function negative_response(): string {
	return random_from_list([
		'Oh no, that sounds terrible!',
		'Yuck!',
		'Gross!',
		'No thanks!',
		'Not for me!',
		'What a terrible choice!',
		'No way!'
	]);
}

export function negative_response_d(): string {
	return random_from_list([
		'I drink what my party people drink!',
		"I'll have what my friends are having!",
		'No thanks!'
	]);
}

export function is_animal(word: string): boolean {
	return animals.includes(word);
}

export function is_color(color: string): boolean {
	return colors.includes(color);
}

export function has_repeated_letter(word: string): boolean {
	const occurance_map: Record<string, number> = {};

	for (const letter of word) {
		if (occurance_map[letter] !== undefined) occurance_map[letter] = occurance_map[letter] + 1;
		else occurance_map[letter] = 1;
	}

	return Object.values(occurance_map).some((num) => num >= 2);
}

export function all_start_same_letter(words: string[]): boolean {
	if (words.length === 0) return false;
	if (words.length === 1) return true;

	return words.every((word) => word[0] === words[0][0]);
}

export function random_from_list<T>(list: T[]): T {
	return list[Math.floor(Math.random() * list.length)];
}
