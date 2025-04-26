<script setup>
import { ref } from 'vue'

const props = defineProps({
  questions: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true
  },
  answers: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:answers', 'next', 'previous'])

const handleAnswer = (questionKey, answer) => {
  emit('update:answers', { ...props.answers, [questionKey]: answer })
}
</script>

<template>
  <div class="question-container">
    <h2>{{ questions[currentStep].question }} *</h2>
    <div class="question-image">
      <img :src="questions[currentStep].image" :alt="questions[currentStep].question">
    </div>
    <div class="options">
      <template v-if="questions[currentStep].options.length > 0">
        <div v-for="option in questions[currentStep].options" :key="option" class="option">
          <input 
            type="radio" 
            :id="option" 
            :value="option" 
            :name="questions[currentStep].key"
            :checked="answers[questions[currentStep].key] === option"
            @change="handleAnswer(questions[currentStep].key, option)"
            required
          />
          <label :for="option">{{ option }}</label>
        </div>
      </template>
      <template v-else>
        <div class="text-input">
          <input 
            type="text" 
            :value="answers[questions[currentStep].key] || ''"
            @input="handleAnswer(questions[currentStep].key, $event.target.value)"
            placeholder="Escribe tu respuesta aquí... (requerido)"
            class="text-field"
            required
          />
        </div>
      </template>
    </div>
    <div class="navigation">
      <button 
        @click="$emit('previous')" 
        :disabled="currentStep === 0"
        class="nav-button"
      >
        Anterior
      </button>
      <button 
        @click="$emit('next')" 
        :disabled="!answers[questions[currentStep].key]"
        class="nav-button"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  min-width: 500px;
}

.question-image {
  width: 100%;
  height: 200px;
  margin: 1rem 0;
  overflow: hidden;
  border-radius: 8px;
}

.question-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.nav-button:hover:not(:disabled) {
  background-color: #45a049;
}

.text-input {
  width: 100%;
  margin: 1rem 0;
}

.text-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.text-field:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}
</style>        