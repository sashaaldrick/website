import { promises as fs } from 'fs';
import { join } from 'path';

export async function load() {
    const contentDir = join(process.cwd(), 'src', 'content');
    const postsDir = join(contentDir, 'posts');

    try {
        // Load index content
        const indexContent = await fs.readFile(join(contentDir, 'index.md'), 'utf-8');

        // Read all files in the posts directory
        const files = await fs.readdir(postsDir);

        // Get content of each file and parse the date from filename
        const posts = await Promise.all(
            files
                .filter(file => file.endsWith('.md'))
                .map(async file => {
                    const content = await fs.readFile(join(postsDir, file), 'utf-8');
                    const date = file.replace('.md', '');
                    return {
                        slug: date,
                        date: new Date(date),
                        content
                    };
                })
        );

        // Sort posts by date, newest first
        const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());

        return {
            indexContent,
            posts: sortedPosts
        };
    } catch (e) {
        return {
            indexContent: '# Welcome\n\nAdd content to `src/content/index.md` to customize this page.',
            posts: []
        };
    }
} 