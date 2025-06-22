<template>
  <div class="chat-container">    
    <audio :src="audioUrl" ref="player" @play="triggerVTutor" />
    <iframe ref="vtutor" src="/vtutor.html" width="640" height="480"></iframe>
    <div class="chat-input">
      <input v-model="msg" @keyup.enter="send" placeholder="メッセージを入力" />
      <button @click="send">送信</button>
    </div>
  </div>
</template>

<script setup>
const msg = ref('')
const audioUrl = ref('')
const player = ref()
const vtutor = ref()

const send = async () => {
  const res = await $fetch('/api/chat', {
    method: 'POST',
    body: { message: msg.value }
  })
  audioUrl.value = res.audioUrl
  console.log(audioUrl.value)
  await nextTick()
  player.value.play()
  msg.value = ''
}

const triggerVTutor = () => {
  vtutor.value?.contentWindow?.postMessage({
    action: 'speak',
    text: msg.value,
    audioUrl: audioUrl.value
  }, '*')
}
</script>

<style scoped>
.chat-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
:global(body) {
  background: url('/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.chat-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.chat-input input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chat-input button:hover {
  background-color: #1565c0;
}

iframe {
  border: none;
  width: 100%;
  border-radius: 12px;
  height: 400px;
}
</style>
