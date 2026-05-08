import { NextResponse } from 'next/server';
import { getQAById } from '@/lib/queries';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const qa = await getQAById(id);

    if (!qa) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(qa);
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}
