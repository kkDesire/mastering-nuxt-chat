<script setup lang="ts">
import type { Chat } from '@/types'

const route = useRoute()
console.log(route.params)


const {
  chat: chatFromChats,
  messages,
  sendMessage
} = useChat(route.params.id as string)

if (!chatFromChats.value) {
  await navigateTo('/', { replace: true })
}
const chat = computed(() => chatFromChats.value as Chat)
const appConfig = useAppConfig()
const typing = ref(false)

const handleSendMessage = async (message: string) => {
  typing.value = true
  await sendMessage(message)
  typing.value = false
}
const title = computed(() =>
  chat.value?.title
    ? `${appConfig.title} - ${chat.value.title}`
    : appConfig.title
)

useHead({
  title
})
</script>

<template>
  <ChatWindow :typing :chat :messages @send-message="handleSendMessage" />
</template>
