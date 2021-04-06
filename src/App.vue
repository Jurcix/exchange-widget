<template>
  <div>
    <card :title="'Rate Section'">
      <rate-section @set-exchange-info="setExchangeInfo($event)" />
    </card>
    <card
      v-if="showResultsSection"
      :title="'Results Section'"
    >
      <results-section
        :exchange-rate="exchangeRate"
        :amount="amount"
        :currency="currency"
      />
    </card>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import Card from './ui-components/Card';
import RateSection from './components/RateSection';
import ResultsSection from './components/ResultsSection';

export default {
    name: 'App',
    components: {
        Card,
        RateSection,
        ResultsSection
    },
    setup() {
        const exchangeRate = ref();
        const amount = ref();
        const currency = ref();
        const showResultsSection = computed(() => exchangeRate.value && amount.value && currency.value);

        const setExchangeInfo = (exchangeRateInfo) => {
            exchangeRate.value = exchangeRateInfo?.exchangeRate;
            amount.value = exchangeRateInfo?.convertedAmount;
            currency.value = exchangeRateInfo?.currency;
        };

        return {
            setExchangeInfo,
            exchangeRate,
            amount,
            currency,
            showResultsSection
        };
    }
};
</script>

<style>
#app {
  font-family: "Lucida Sans", sans-serif;
  margin: 0.5rem;
}
</style>
