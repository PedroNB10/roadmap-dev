import fs from 'fs';
import path from 'path';
import { ProgressMap } from './types';

const PROGRESS_PATH = process.env.PROGRESS_FILE_PATH || path.join(process.cwd(), 'data', 'progress.json');

export function readProgress(): ProgressMap {
  try {
    const raw = fs.readFileSync(PROGRESS_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as ProgressMap;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
    console.error('Falha ao ler progress.json:', error);
    return {};
  }
}

function writeProgress(progress: ProgressMap) {
  const tmpPath = `${PROGRESS_PATH}.tmp`;
  fs.mkdirSync(path.dirname(PROGRESS_PATH), { recursive: true });
  fs.writeFileSync(tmpPath, `${JSON.stringify(progress, null, 2)}\n`);
  fs.renameSync(tmpPath, PROGRESS_PATH);
}

export function setTopicProgress(slug: string, completed: boolean): ProgressMap {
  const progress = readProgress();
  progress[slug] = completed;
  writeProgress(progress);
  return progress;
}
