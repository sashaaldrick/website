import { promises as fs } from 'fs';
import { join } from 'path';

export async function load() {
    const contentDir = join(process.cwd(), 'src', 'content');

    try {
        const content = await fs.readFile(join(contentDir, 'now.md'), 'utf-8');
        return { content };
    } catch (e) {
        console.error('Error loading now page content:', e);
        return { content: '# Now\n\nAdd content to `src/content/now.md` to customize this page.' };
    }
} 