<template>
  <div className="steps">
    <ul>
      <li v-for="s in steps" :class="s <= step + 1 ? 'done' : ''" :key="s">
        <span className="number">{{ s }}</span>
      </li>
    </ul>
  </div></template
>

<script>
import "../styles/stepper.scss";
export default {
  name: "stepper",
  data() {
    return {
      steps: [1, 2, 3],
    };
  },
  props: {
    step: Number,
  },
};
</script>
