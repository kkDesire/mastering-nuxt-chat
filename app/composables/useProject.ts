import type { Project } from "@/types"

export default function useProject(projectId: string){
  const { projects } = useProjects()

  const project = computed(() => {
    return projects.value.find(p => p.id === projectId)
  })


  function updateProject(updateProject: Partial<Project>){
    if(!project.value) return

    const index = projects.value.findIndex(p => p.id === projectId)
    if(index === -1) return

    projects.value[index] = {
      ...project.value,
      ...updateProject,
      id: projectId
    }
  }
  return {
    project,
    updateProject
  }
}
