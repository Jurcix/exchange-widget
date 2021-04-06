<template>
  <div class="container">
    <div>Exchange rate is {{ exchangeRate }}</div>
    <div>Converted amount {{ amount }} {{ currency }}</div>
  </div>
</template>

<script>
export default {
    props: {
        exchangeRate: {
            type: Number,
            default: null
        },
        amount: {
            type: Number,
            default: null
        },
        currency: {
            type: String,
            default: null
        }
    }
};
</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
        flex-flow: column;
    }
</style>





