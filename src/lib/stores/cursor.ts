import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type CursorState = {
    x: number;
    y: number;
    hasMouseMoved: boolean;
};

const createCursorStore = () => {
    const initialState: CursorState = {
        x: browser ? window.innerWidth / 2 : 0,
        y: browser ? window.innerHeight / 2 : 0,
        hasMouseMoved: false
    };

    const { subscribe, set, update } = writable<CursorState>(initialState);

    return {
        subscribe,
        updatePosition: (x: number, y: number) => update(state => ({
            ...state,
            x,
            y,
            hasMouseMoved: true
        })),
        reset: () => set(initialState)
    };
};

export const cursorStore = createCursorStore(); 