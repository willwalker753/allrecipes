import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Home from './Home';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
    it('renders main home content', () => {
        const editor = shallow(<Home />);
        expect(editor.find('#main').length).toEqual(1);
    });
});