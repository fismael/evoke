<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import QuestionContainer from './components/QuestionContainer.vue'
import PerfumeResults from './components/PerfumeResults.vue'
import questions from '../questions.json'

const currentStep = ref(0)
const answers = ref({})
const showWelcome = ref(true)
const showResults = ref(false)

const startQuiz = () => {
  showWelcome.value = false
}

const nextQuestion = () => {
  if (currentStep.value < questions.length - 1) {
    currentStep.value++
  } else {
    showResults.value = true
  }
}

const previousQuestion = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const restartQuiz = () => {
  showWelcome.value = true
  currentStep.value = 0
  answers.value = {}
  showResults.value = false
}
</script>

<template>
  <div class="wrapper">
    <Transition name="fade" mode="out-in">
      <div v-if="showWelcome" class="welcome-screen">
        <TheWelcome />
        <button @click="startQuiz" class="start-button">
          Comenzar Quiz
        </button>
      </div>
      <QuestionContainer
        v-else-if="!showResults"
        :questions="questions"
        :current-step="currentStep"
        :answers="answers"
        @update:answers="answers = $event"
        @next="nextQuestion"
        @previous="previousQuestion"
      />
      <PerfumeResults
        v-else
        :answers="answers"
        :questions="questions"
        @restart="restartQuiz"
      />
    </Transition>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.wrapper {
  margin: 0 auto;
  padding: 2rem;
}

.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.start-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.start-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
