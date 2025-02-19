import type { SpringOptions } from '@motionone/svelte';

export const springConfig: SpringOptions = {
    stiffness: 0.2,
    damping: 0.8,
    mass: 0.3
};

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    options: springConfig
};

export const stagger = (delay: number = 0.1) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    options: {
        ...springConfig,
        delay: delay
    }
});

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    options: springConfig
}; 