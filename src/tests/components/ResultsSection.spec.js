import { mount } from '@vue/test-utils';
import ResultsSection from '../../components/ResultsSection';

describe('ResultsSection component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(ResultsSection);
    });

    it('should show exchange rate, amount and currency', async () => {
        const mockExchangeRate = 1.23;
        const mockAmount = 456;
        const mockCurrency = 'EUR';
        await wrapper.setProps({
            exchangeRate: mockExchangeRate,
            amount: mockAmount,
            currency: mockCurrency
        });
        const exchangeRateMessage = wrapper.findAll('div')[1];
        const convertedAmountMessage = wrapper.findAll('div')[2];

        expect(exchangeRateMessage.text()).toBe(`Exchange rate is ${mockExchangeRate}`);
        expect(convertedAmountMessage.text()).toBe(`Converted amount ${mockAmount} ${mockCurrency}`);
    });
});
