import { mount } from '@vue/test-utils';

import Card from '../../ui-components/Card';

describe('Card component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Card);
    });

    it('should show title', async () => {
        const mockTitle = 'Test title';
        await wrapper.setProps({
            title: mockTitle
        });
        const title = wrapper.find('h2');

        expect(title.text()).toBe(`${mockTitle}`);
    });
});
