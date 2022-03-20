import fs from 'fs';
import path from 'path';

export const logDir = path.join(process.cwd(), 'logs');
export const cacheDir = path.join(process.cwd(), '.cache');
export const emotesDir = path.join(cacheDir, 'emotes');

if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
if (!fs.existsSync(emotesDir)) fs.mkdirSync(emotesDir);
