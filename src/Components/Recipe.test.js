import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Recipe from './Recipe';

configure({ adapter: new Adapter() });

describe('<Recipe />', () => {
    it('renders loading spinner', () => {
        const editor = shallow(<Recipe />);
        expect(editor.find('#loadingSpinner').length).toEqual(1);
    });
    it('mounts the component', () => {
        const dom = mount(<Recipe />);
        expect(dom.find('#recipe').length).toEqual(0);
    });
});