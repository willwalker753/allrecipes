import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Login from './Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
    it('renders login form', () => {
        const editor = shallow(<Login />);
        expect(editor.find('#loginForm').length).toEqual(1);
    });
});