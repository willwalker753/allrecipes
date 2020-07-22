import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Signup from './Signup';

configure({ adapter: new Adapter() });

describe('<Signup />', () => {
    it('renders signup form', () => {
        const editor = shallow(<Signup />);
        expect(editor.find('#signUpForm').length).toEqual(1);
    });
});