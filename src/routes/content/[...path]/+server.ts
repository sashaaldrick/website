import { error } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import { join } from 'path';

export async function GET({ params }) {
    try {
        const { path } = params;
        const filePath = join(process.cwd(), 'src', 'content', `${path}`);
        const content = await fs.readFile(filePath, 'utf-8');

        return new Response(content, {
            headers: {
                'Content-Type': 'text/markdown'
            }
        });
    } catch (e) {
        throw error(404, 'Content not found');
    }
} 