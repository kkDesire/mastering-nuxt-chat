import { getMessagesByChatId, createMessageForChat } from "../../../../repository/chatRepository"
import { createOllamaModel, generateChatResponse } from "../../../../services/ai-service"

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const history = getMessagesByChatId(id)

  const ollamaModel = createOllamaModel()

  const replay = await generateChatResponse(ollamaModel, history)

  return createMessageForChat({
    chatId: id,
    content: replay,
    role: "assistant",
  })
})
