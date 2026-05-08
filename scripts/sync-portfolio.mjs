import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const sourceDir = resolve(root, 'portfolio', 'dist');
const targetDir = resolve(root, 'public', 'portfolio');

if (!existsSync(sourceDir)) {
  console.error('Portfolio build output was not found. Run "npm --prefix portfolio run build" first.');
  process.exit(1);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });

console.log('Portfolio assets synced to public/portfolio');
