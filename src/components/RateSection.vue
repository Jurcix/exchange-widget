<template>
  <div class="container">
    <div class="item">
      <label for="baseCurrency">Base Currency: </label>
      <select
        id="baseCurrency"
        v-model="selectedBaseCurrency"
      >
        <option
          value=""
          disabled
          hidden
        >
          Select Base Currency
        </option>
        <option
          v-for="(baseCurrency, index) in baseCurrencies"
          :key="index"
          :value="baseCurrency"
        >
          {{ baseCurrency }}
        </option>
      </select>
    </div>
    <div class="item">
      <label for="quoteCurrency">Quote Currency: </label>
      <select
        id="quoteCurrency"
        v-model="selectedQuoteCurrency"
      >
        <option
          value=""
          selected
          disabled
          hidden
        >
          Select Quote Currency
        </option>
        <option
          v-for="(quoteCurrency, index) in quoteCurrencies"
          :key="index"
          :value="quoteCurrency"
        >
          {{ quoteCurrency }}
        </option>
      </select>
    </div>
    <div class="item">
      <label for="baseAmount">Amount: </label>
      <input
        id="baseAmount"
        type="number"
        :value="amount"
        placeholder="Enter the amount to convert"
        @input="debounce(() => { amount = $event.target.value })"
      >
      <div
        v-if="amount && !isValidInteger"
        class="validation-message"
      >
        Amount should be a valid integer
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';

import { CURRENCIES } from '../constants';
import ExchangeRateRepository from '../repositories/ExchangeRateRepository';

export default {
    emits: ['setExchangeInfo'],
    setup(props, { emit }) {
        const baseCurrencies = ref(CURRENCIES);
        const quoteCurrencies = ref(CURRENCIES);
        const selectedBaseCurrency = ref('');
        const selectedQuoteCurrency = ref('');
        const amount = ref();
        const isValidInteger = computed(() => Number.isInteger(Number(amount.value)));

        const createDebounce = () => {
            let timeout = null;
            return function (fnc, delayMs) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fnc();
                }, delayMs || 500);
            };
        };

        const getExchangeRate = async (requestParams) => {
            try {
                const response = await ExchangeRateRepository.get(requestParams);
                const exchangeRateInfo = {
                    exchangeRate: response.data.exchange_rate,
                    convertedAmount: response.data.quote_amount,
                    currency: requestParams.quote_currency,
                };

                return exchangeRateInfo;
            } catch(err) {
                alert('Woops! Something went wrong \n' + err);
            }
        };

        const validProvidedValues = (baseCurrency, quoteCurrency, amount) => {
            return baseCurrency && quoteCurrency && amount && isValidInteger.value;
        };

        watch([selectedBaseCurrency, selectedQuoteCurrency, amount], async (newValues) => {
            const [baseCurrency, quoteCurrency, amount] = newValues;
            let exchangeRateInfo;

            if (validProvidedValues(baseCurrency, quoteCurrency, amount)) {
                const requestParams = {
                    base_currency: selectedBaseCurrency.value,
                    quote_currency: selectedQuoteCurrency.value,
                    base_amount: amount
                };

                exchangeRateInfo = await getExchangeRate(requestParams);
            }
            emit('setExchangeInfo', exchangeRateInfo);
        });

        return {
            baseCurrencies,
            quoteCurrencies,
            selectedBaseCurrency,
            selectedQuoteCurrency,
            amount,
            debounce: createDebounce(),
            isValidInteger
        };
    }
};
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: space-around;
        flex-flow: row;
        flex-wrap: wrap;
    }
    .item {
        padding: 2px;
        width: 12rem
    }
    .item select {
        width: inherit;
    }
    .item input {
        width: inherit;
        padding: 0;
    }
    .item label {
        font-size: 10px;
    }
    .validation-message {
        font-size: 10px;
        color: red;
    }

</style>
