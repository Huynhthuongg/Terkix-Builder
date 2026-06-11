import { NextRequest, NextResponse } from 'next/server';

// Mock file storage
const files: Record<string, any[]> = {};

export async function GET(request: NextRequest) {
  try {
    const projectId = request.nextUrl.searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Missing projectId' },
        { status: 400 }
      );
    }

    const projectFiles = files[projectId] || [];
    return NextResponse.json({
      success: true,
      data: projectFiles,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, name, content, type } = body;

    if (!projectId || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!files[projectId]) {
      files[projectId] = [];
    }

    const newFile = {
      id: Date.now().toString(),
      name,
      content: content || '',
      type: type || 'file',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    files[projectId].push(newFile);

    return NextResponse.json(
      { success: true, data: newFile },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create file' },
      { status: 500 }
    );
  }
}
