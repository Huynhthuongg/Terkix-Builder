import { NextRequest, NextResponse } from 'next/server';

// Mock database
const projects: any[] = [];

export async function GET(request: NextRequest) {
  try {
    // Get all projects
    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, language } = body;

    if (!name || !language) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProject = {
      id: Date.now().toString(),
      name,
      description,
      language,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: [],
    };

    projects.push(newProject);

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
