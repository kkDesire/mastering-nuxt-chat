<script setup lang="ts">
const route = useRoute()
console.log(route.params)


const {
  chat: chatFromChats,
  messages,
  sendMessage,
  fetchMessages,
} = useChat(route.params.id as string)


await fetchMessages()

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
