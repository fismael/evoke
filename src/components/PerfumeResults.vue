<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  answers: {
    type: Object,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
})

const loading = ref(true)
const perfumeIngredients = ref('')
const error = ref(null)

const emit = defineEmits(['restart'])

const formatText = (text) => {
  // Convert **text** to <strong>text</strong>
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

const getPerfumeRecommendation = async () => {
  try {
    loading.value = true
    error.value = null

    // Format the answers for the API
    const formattedAnswers = Object.entries(props.answers).map(([key, value]) => {
      const question = props.questions.find(q => q.key === key)
      return `${question.question}: ${value}`
    }).join('\n')

    const prompt = `Con base en las siguientes respuestas, recomiende una receta de perfume con ingredientes específicos y sus proporciones. 
    Céntrese en ingredientes naturales y aceites esenciales. Incluya notas de fondo, notas medias y notas de salida. 
    Además, proporcione una breve explicación de por qué se eligieron estos ingredientes. Usar un formato super amigable para un usuario de 10 años.
    Use ** para resaltar palabras importantes como nombres de ingredientes, proporciones y términos técnicos usar mas emojis.

Respuestas:
${formattedAnswers}`

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get perfume recommendation')
    }

    const data = await response.json()
    perfumeIngredients.value = formatText(data.candidates[0].content.parts[0].text)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getPerfumeRecommendation()
})
</script>

<template>
  <div class="perfume-results">
    <h2>Tu Perfume Personalizado</h2>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Creando tu perfume personalizado...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Lo sentimos, hubo un error al generar tu perfume. Por favor, intenta de nuevo.</p>
      <button @click="getPerfumeRecommendation" class="retry-button">
        Intentar de nuevo
      </button>
    </div>

    <div v-else class="ingredients">
      <div class="ingredients-content" v-html="perfumeIngredients"></div>
      <button @click="$emit('restart')" class="restart-button">
        Comenzar de nuevo
      </button>
    </div>
  </div>
</template>

<style scoped>
.perfume-results {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  color: #e74c3c;
}

.retry-button, .restart-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.retry-button:hover, .restart-button:hover {
  background-color: #45a049;
}

.ingredients {
  line-height: 1.6;
  text-align: center;
}

.ingredients-content {
  white-space: pre-line;
  margin-bottom: 2rem;
  text-align: left;
}

.ingredients-content strong {
  font-weight: 600;
}
</style> 