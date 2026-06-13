import EditorWorkspace from "@/components/ide/EditorWorkspace";

interface EditorPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { projectId } = await params;

  return <EditorWorkspace projectId={projectId} />;
}
