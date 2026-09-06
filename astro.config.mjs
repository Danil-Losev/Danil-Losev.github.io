import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkCallouts from './src/plugins/remark-callouts';

export default defineConfig({
    site: 'https://danil-losev.github.io',

    markdown: {
        remarkPlugins: [
            remarkGfm,
            remarkDirective,
            remarkCallouts,
        ],
    },
});