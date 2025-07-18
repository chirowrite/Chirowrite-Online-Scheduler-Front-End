<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.msg }}</p>
    <button @click="turnOff">OK</button>
  </div>
</template>

<script>
export default {
  props: ['post'],
};
</script>
