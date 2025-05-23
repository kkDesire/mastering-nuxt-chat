import { getMessagesByChatId } from '../../../../repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const messages = getMessagesByChatId(id)
  return messages
})
