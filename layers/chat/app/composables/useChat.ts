export default function useChat(chatId: string){
  const { chats } = useChats()


  const chat = computed(() => {
    return chats.value.find(c => c.id === chatId)
  })

  const messages = computed<ChatMessage[]>(
    () => chat.value?.messages || []
  )

  const { data, execute, status } = useFetch<ChatMessage[]>(`/api/chats/${chatId}/messages`, {
    immediate: false,
    default: () => []
  })

  async function fetchMessages(){
    if(status.value !== 'idle' || !chat.value) return
    await execute()
    chat.value.messages = data.value
  }

  async function generateChatTitle(message: string){
    if(!chat.value) return

    const updatedChat = await $fetch<Chat>(`/api/chats/${chatId}/title`, {
      method: 'POST',
      body: {
        message
      }
    })

    chat.value.title = updatedChat.title
  }

  async function sendMessage(message: string){
    if(!chat.value) return

    if(messages.value.length === 0){
      await generateChatTitle(message)
    }

    const newMessages = await $fetch<ChatMessage>(`/api/chats/${chatId}/messages`, {
      method: 'POST',
      body: {
        content: message,
        role: 'user'
      }
    })

    messages.value.push(newMessages)

    const aiResponse = await $fetch<ChatMessage>(`/api/chats/${chatId}/messages/generate`, {
      method: 'POST',
      body: {
        content: message,
        role: 'assistant'
      }
    })
    messages.value.push(aiResponse)

    chat.value.updatedAt = new Date()
  }
  return {
    chat,
    messages,
    sendMessage,
    fetchMessages,
  }
}

