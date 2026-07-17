import { NextRequest, NextResponse } from 'next/server';
import { readProgress, setTopicProgress } from '@/lib/progress-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(readProgress());
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === 'string' ? body.slug : null;
  const completed = typeof body?.completed === 'boolean' ? body.completed : null;

  if (!slug || completed === null) {
    return NextResponse.json({ error: 'slug (string) and completed (boolean) are required' }, { status: 400 });
  }

  setTopicProgress(slug, completed);
  return NextResponse.json({ slug, completed });
}
