import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/projectStore';

export function useProject(projectId?: string) {
  const { projects, currentProject, setCurrentProject, fetchProjects } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
      setIsLoading(false);

      if (projectId) {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          setCurrentProject(project);
        }
      }
    };

    loadProjects();
  }, [projectId]);

  return {
    projects,
    currentProject,
    isLoading,
  };
}
