import { NextResponse } from 'next/server';
import { getAllMembers } from '@/lib/queries';

export async function GET() {
  try {
    const members = await getAllMembers();

    return NextResponse.json({
      members: members.map((member) => ({
        id: member.id,
        displayName: member.display_name,
        email: member.email,
        skills: member.skills,
        summary: member.summary,
        aliases: member.aliases,
        groupName: member.group_name,
      })),
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      {
        members: [],
      },
      { status: 200 }
    );
  }
}