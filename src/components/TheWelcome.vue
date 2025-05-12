<script setup>

</script>

<template>
    <div class="app-welcome">
        <div class="welcome-content">
            <h1>Bienvenido al Creador de Perfumes</h1>
            <p>
              Te haremos una serie de preguntas para entender mejor el tipo de perfume que deseas crear.
              Con tus respuestas, diseñaremos una combinación única de ingredientes que refleje tu estilo y personalidad.</p>
            <img src="../assets/logo.png" alt="logo">
        </div>
    </div>
</template>


<style scoped>
.app-welcome {
  text-align: center;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 700px;
}
.app-welcome p {
  text-wrap: pretty;
}
.app-welcome img{
  width: 35%;
  object-fit: contain;
  border-radius: 25px;
  margin-top: 2rem;
}
</style>