<template>
  <div class="card">
    <h2 class="card--title">
      {{ title }}
    </h2>
    <div class="card--content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
    .card {
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    }
    .card--title {
        font-weight: 400;
        padding: 1rem 1rem 0 1rem;
        margin-left: 1rem;
        overflow-wrap: break-word;
    }
    .card--content {
        padding: 1rem;
    }
</style>
