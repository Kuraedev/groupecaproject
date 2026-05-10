/**
 * Portfolio Tool - MCP Tool for portfolio information retrieval
 * Queries team member information and project details
 * Integrates with database and portfolio components
 */

import type { Tool, PortfolioInput } from '../types';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  projects: string[];
  experience: string;
}

export const portfolioTool: Tool = {
  name: 'portfolio',
  description:
    'Query and retrieve portfolio information for Group 2 members. Returns skills, projects, and experience data.',
  schema: {
    memberId: 'optional',
    filterBy: 'optional',
  },
  handler: async (input: Record<string, unknown>): Promise<unknown> => {
    const { memberId, filterBy } = input as PortfolioInput;

    try {
      const members = getTeamMembers();

      let result: unknown;

      if (memberId) {
        const member = members.find((m) => m.id === memberId);
        if (!member) {
          throw new Error(`Team member '${memberId}' not found`);
        }

        if (filterBy === 'skills') {
          result = { memberId, skills: member.skills };
        } else if (filterBy === 'projects') {
          result = { memberId, projects: member.projects };
        } else if (filterBy === 'experience') {
          result = { memberId, experience: member.experience };
        } else {
          result = member;
        }
      } else {
        // Return all members
        if (filterBy === 'skills') {
          result = members.map((m) => ({ name: m.name, skills: m.skills }));
        } else if (filterBy === 'projects') {
          result = members.map((m) => ({ name: m.name, projects: m.projects }));
        } else {
          result = members;
        }
      }

      return {
        data: result,
        timestamp: new Date().toISOString(),
        source: 'portfolio-database',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Portfolio tool failed: ${errorMessage}`);
    }
  },
};

/**
 * Get team member information
 */
function getTeamMembers(): TeamMember[] {
  return [
    {
      id: 'karl-castillo',
      name: 'Karl Andrei Castillo',
      role: 'Full-Stack Developer',
      skills: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Supabase'],
      projects: ['Digital Twin', 'Portfolio Platform', 'Chat Application'],
      experience: 'Building scalable web applications with modern tech stack',
    },
    {
      id: 'rhys-suyu',
      name: 'Rhys Cristian Suyu',
      role: 'Frontend & DevOps',
      skills: ['React', 'Tailwind CSS', 'Vercel', 'CI/CD', 'GitHub Actions'],
      projects: ['Digital Twin UI', 'Portfolio Components', 'Deployment Automation'],
      experience: 'Frontend development and cloud deployment optimization',
    },
    {
      id: 'jake-cardenas',
      name: 'Jake Cardenas',
      role: 'Backend & Documentation',
      skills: ['Node.js', 'API Design', 'PostgreSQL', 'Technical Writing'],
      projects: ['API Routes', 'Database Schema', 'Project Documentation'],
      experience: 'Backend architecture and comprehensive technical documentation',
    },
    {
      id: 'michael-josh',
      name: 'Michael Josh Jacinto',
      role: 'Team Member',
      skills: ['JavaScript', 'React', 'Web Development'],
      projects: ['Portfolio Frontend', 'UI Components'],
      experience: 'Web development and component design',
    },
    {
      id: 'pearlshaline-gumiran',
      name: 'Pearlshaline Gumiran',
      role: 'Team Member',
      skills: ['Web Development', 'UI/UX', 'Design'],
      projects: ['Design System', 'User Interface'],
      experience: 'User experience and interface design',
    },
  ];
}
