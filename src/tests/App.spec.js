import { mount } from '@vue/test-utils';

import App from '../App';
import Card from '../ui-components/Card';
import RateSection from '../components/RateSection';
import ResultsSection from '../components/ResultsSection';

describe('App component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(App);
    });

    it('should have one Card component', async() => {
        const title = 'Rate Section';

        const cardComponents = wrapper.findAllComponents(Card);

        expect(cardComponents.length).toBe(1);
        expect(cardComponents[0].exists()).toBe(true);
        expect(cardComponents[0].props().title).toBe(title);
    });

    it('should have RateSection component', async() => {
        const rateSectionComponent = wrapper.findComponent(RateSection);

        expect(rateSectionComponent.exists()).toBe(true);
    });

    describe('when exchange information exists', () => {
        beforeEach(() => {
            const mockExchangeRateInfo = {
                exchangeRate: 1.5,
                convertedAmount: 123,
                currency: 'EUR'
            };

            wrapper.findComponent(RateSection).vm.$emit('setExchangeInfo', mockExchangeRateInfo);
        });

        it('should have two Card components', () => {
            const rateSectionTitle = 'Rate Section';
            const resultsSectionTitle = 'Results Section';

            const cardComponents = wrapper.findAllComponents(Card);

            expect(cardComponents.length).toBe(2);
            expect(cardComponents[0].exists()).toBe(true);
            expect(cardComponents[0].props().title).toBe(rateSectionTitle);
            expect(cardComponents[1].exists()).toBe(true);
            expect(cardComponents[1].props().title).toBe(resultsSectionTitle);
        });

        it('should have ResultsSection component', async() => {
            const resultsSectionComponent = wrapper.findComponent(ResultsSection);

            expect(resultsSectionComponent.exists()).toBe(true);
        });
    });


});


