import { writable } from 'svelte/store';

export interface convertedObjectType {
	key: string;
	value: string;
	depth: number;
}

export const showResult = writable(false);
export const prefix = writable('NEXT_PUBLIC_');
export const currentCode = writable({});
export const envOutput = writable([]);
export const referenceOutput = writable([]);
