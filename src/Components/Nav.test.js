import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Nav from './Nav';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
    it('renders nav bar', () => {
        const editor = shallow(<Nav />);
        expect(editor.find('#navBox').length).toEqual(1);
    });
});