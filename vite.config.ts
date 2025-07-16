import { defineConfig } from 'vite';
import alias from '@rollup/plugin-alias';
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    preview: {
    allowedHosts: [
      'ai-resume-9.onrender.com', // Ваш хост
      'localhost',                // Для локальной разработки
    ]
  },
  assetsInclude: ['**/*.docx'], 
  // ... другие конфигурации ...
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
    alias({
      entries: [
        { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
        { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
        { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
        { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      ],
    }),
  ],
});
