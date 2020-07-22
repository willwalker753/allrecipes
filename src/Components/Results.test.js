import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Results from './Results';

configure({ adapter: new Adapter() });

describe('<Results />', () => {
    it('renders loading spinner', () => {
        const editor = shallow(<Results />);
        expect(editor.find('#loadingSpinner').length).toEqual(1);
    });
    it('mounts the component', () => {
        const dom = mount(<Results />);
        expect(dom.find('#resultsFlexBox').length).toEqual(0);
    });
});