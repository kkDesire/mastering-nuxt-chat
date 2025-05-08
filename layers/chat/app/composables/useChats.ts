export default function useChats() {
  const chats = useState<Chat[]>('chats', () => [MOCK_CHAT])

  /**
   * Create a new chat object.
   *
   * @param {Object} [options]
   * @param {string} [options.projectId]
   * @returns {Chat}
   */
  function createChat(
    options: {projectId?: string} = {}
  ): Chat {
    const id = (chats.value.length + 1).toString()
    const chat = {
      id,
      title: `Chat ${id}`,
      messages: [],
      projectId: options.projectId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    chats.value.push(chat)
    return chat
  }

  async function createChatAndNavigate(
    options: { projectId?: string } = {}
  ){
    const chat = createChat(options)
    if(chat.projectId){
      await navigateTo(`/projects/${chat.projectId}/chats/${chat.id}`)
    }else{
      await navigateTo(`/chats/${chat.id}`)
    }
  }

  function chatsInProject(projectId: string){
    return chats.value.filter(chat => chat.projectId === projectId)
  }
  return {
    chats,
    createChat,
    createChatAndNavigate,
    chatsInProject
  } 
}
