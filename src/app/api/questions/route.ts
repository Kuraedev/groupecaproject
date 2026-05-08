import { NextResponse } from 'next/server';
import { getAllQA } from '@/lib/queries';

export async function GET() {
  try {
    const questions = await getAllQA();
    
    if (!questions || questions.length === 0) {
      return NextResponse.json({
        questions: [
          { id: 1, question: 'Who are the members of Group 2?' },
          { id: 2, question: 'What are your skills?' },
          { id: 3, question: 'What projects have you built recently?' },
          { id: 4, question: 'How do I become a full-stack developer?' },
          { id: 5, question: 'How can I contact the group?' },
        ],
      });
    }

    return NextResponse.json({
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
      })),
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      {
        questions: [
          { id: 1, question: 'Who are the members of Group 2?' },
          { id: 2, question: 'What are your skills?' },
          { id: 3, question: 'What projects have you built recently?' },
        ],
      },
      { status: 200 }
    );
  }
}
