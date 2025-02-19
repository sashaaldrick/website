import { writable } from 'svelte/store';

// Store for managing the text width of the site
export const textWidth = writable(85); // Default width in ch units (widest) 