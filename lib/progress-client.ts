import { ProgressMap } from './types';

export async function fetchProgress(): Promise<ProgressMap> {
  try {
    const res = await fetch('/api/progress', { cache: 'no-store' });
    if (!res.ok) return {};

    const parsed = await res.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    return parsed as ProgressMap;
  } catch (error) {
    console.error('Falha ao carregar progresso:', error);
    return {};
  }
}

export async function updateProgress(slug: string, completed: boolean): Promise<void> {
  try {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, completed }),
    });
  } catch (error) {
    console.error('Falha ao salvar progresso:', error);
  }
}
