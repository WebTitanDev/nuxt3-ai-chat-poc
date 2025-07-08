# nuxt3-ai-chat-poc
[PoC] Nuxt 3 + VTutor + Groq + TTS Integration  
    **VTutor** is an interactive web-based talking avatar that responds to chat messages with synthesized speech and real-time facial animation. It uses Vue 3 for the chat interface and HTML5 Canvas with the Web Audio API to animate the avatar’s mouth and eyebrows based on voice volume and emotion.
![Preview](https://prnt.sc/3kac7ds6i2ls)


## Features
- Japanese and English TTS support
- Responsive design
- Audio playback
- VTutor integration
- Groq API integration
- TTS fallback


## Project Structure

├── public/<br>
│ ├── avatar-base.png # Avatar face image<br>
│ ├── mouth-open.png # Open mouth overlay<br>
│ ├── background.jpg # Chat background<br>
│ └── vtutor.html # Animated avatar (iframe target)<br>
│<br>
├── components/<br>
│ └── ChatBox.vue # Chat interface + iframe integration<br>
│<br>
├── pages/<br>
│ └── api/chat.ts # Returns audioUrl for spoken message<br>
│<br>
├── README.md<br>

## Getting Started

### 1. Install dependencies

```bash
npm install
```
### 2. Start development server

```bash
npm run dev
```

## 💡 How It Works
### 1. User types a message in ChatBox.vue
### 2. The message is sent to /api/chat, which returns a TTS audio URL
### 3. The Vue component sends the audio URL + text to the embedded vtutor.html via postMessage
### 4. vtutor.html plays the audio, analyzes volume, and animates the avatar:
- Mouth opens based on volume level
- Eyebrows change shape to reflect emotion (angry/happy/neutral)

### 🧪 Example API Response (/api/chat)
{<br>
  "replyText": "こんにちは！お元気ですか？",<br>
  "audioUrl": "https://unreal-expire-in-90-days.s3-us-west-2.amazonaws.com/<br>0bd43948-ec5c-44d9-9521-cf40c2a7ce6c-0.mp3",<br>
  "ttsProvider": "UnrealSpeech"<br>
}

## 🔧 Customization
### Expression thresholds (vtutor.html)
```bash
if (volume > 15) emotion = 'angry'
else if (volume > 7) emotion = 'happy'
else emotion = 'neutral'
```
### Mouth animation easing

```bash
currentMouthScale += (targetScale - currentMouthScale) * 0.05
```
Make this value lower (e.g., 0.03) for slower/smoother animation.

### Avatar art
Replace these files in public/:

- avatar-base.png
- mouth-open.png <br>

With your own illustrations.

## 📜 License

MIT License © 2025 Brian Ryder