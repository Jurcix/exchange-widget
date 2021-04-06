import { mount } from '@vue/test-utils';

import { CURRENCIES } from '../../constants';
import RateSection from '../../components/RateSection';

describe('RateSection component', () => {
    let wrapper;
    jest.useFakeTimers();

    beforeEach(() => {
        wrapper = mount(RateSection);
    });

    it('should contain three items', () => {
        const items = wrapper.findAll('.item');

        expect(items.length).toBe(3);
    });

    describe('Item with Base Currency dropdown', () => {
        let baseCurrencyItem;
        beforeEach(() => {
            baseCurrencyItem = wrapper.findAll('.item')[0];
        });

        it('should contain label with text "Base Currency:"', () => {
            const text = 'Base Currency:';

            expect(baseCurrencyItem.find('label').text()).toBe(text);
        });

        it('should contain select with options', () => {
            const optionSelectBaseCurrencyText = 'Select Base Currency';
            const optionUSDText = CURRENCIES[0];
            const optionEURText = CURRENCIES[1];
            const optionILSText = CURRENCIES[2];

            const baseCurrencySelect = baseCurrencyItem.find('select');
            const selectOptions = baseCurrencySelect.findAll('option');

            expect(baseCurrencySelect.exists()).toBe(true);
            expect(selectOptions.length).toBe(4);
            expect(selectOptions[0].text()).toBe(optionSelectBaseCurrencyText);
            expect(selectOptions[1].text()).toBe(optionUSDText);
            expect(selectOptions[2].text()).toBe(optionEURText);
            expect(selectOptions[3].text()).toBe(optionILSText);
        });

        it('should emit setExchangeInfo event when value is selected', async() => {
            const baseCurrencySelect = baseCurrencyItem.find('select');

            baseCurrencySelect.setValue(CURRENCIES[0]);
            await wrapper.vm.$nextTick();

            expect(wrapper.emitted().setExchangeInfo).toBeTruthy();
        });
    });

    describe('Item with Quote Currency dropdown', () => {
        let quoteCurrencyItem;
        beforeEach(() => {
            quoteCurrencyItem = wrapper.findAll('.item')[1];
        });

        it('should contain label with text "Quote Currency:"', () => {
            const text = 'Quote Currency:';

            expect(quoteCurrencyItem.find('label').text()).toBe(text);
        });

        it('should contain select with options', () => {
            const optionSelectQuoteCurrencyText = 'Select Quote Currency';
            const optionUSDText = CURRENCIES[0];
            const optionEURText = CURRENCIES[1];
            const optionILSText = CURRENCIES[2];

            const quoteCurrencySelect = quoteCurrencyItem.find('select');
            const selectOptions = quoteCurrencySelect.findAll('option');

            expect(quoteCurrencySelect.exists()).toBe(true);
            expect(selectOptions.length).toBe(4);
            expect(selectOptions[0].text()).toBe(optionSelectQuoteCurrencyText);
            expect(selectOptions[1].text()).toBe(optionUSDText);
            expect(selectOptions[2].text()).toBe(optionEURText);
            expect(selectOptions[3].text()).toBe(optionILSText);
        });

        it('should emit setExchangeInfo event when value is selected', async() => {
            const quoteCurrencySelect = quoteCurrencyItem.find('select');

            quoteCurrencySelect.setValue(CURRENCIES[0]);
            await wrapper.vm.$nextTick();

            expect(wrapper.emitted().setExchangeInfo).toBeTruthy();
        });
    });

    describe('Item with Amount input', () => {
        let amountItem;
        beforeEach(() => {
            amountItem = wrapper.findAll('.item')[2];
        });

        it('should contain label with text "Amount:"', () => {
            const text = 'Amount:';

            expect(amountItem.find('label').text()).toBe(text);
        });

        it('should contain input field', () => {
            expect(amountItem.find('input').exists()).toBe(true);
            expect(amountItem.find('.validation-message').exists()).toBe(false);
        });

        it('should show validation message if input value is not a valid integer', async() => {
            const validationMessage = 'Amount should be a valid integer';
            const amountInput = amountItem.find('input');

            amountInput.setValue(3.5);
            jest.advanceTimersByTime(1000);
            await wrapper.vm.$nextTick();
            const validationMessageEl = amountItem.find('.validation-message');

            expect(validationMessageEl.exists()).toBe(true);
            expect(validationMessageEl.text()).toBe(validationMessage);
        });

        it('should emit setExchangeInfo event when value is provided', async() => {
            const amountInput = amountItem.find('input');

            amountInput.setValue(3);
            jest.advanceTimersByTime(1000);
            await wrapper.vm.$nextTick();
            expect(wrapper.emitted().setExchangeInfo).toBeTruthy();
        });
    });
});
