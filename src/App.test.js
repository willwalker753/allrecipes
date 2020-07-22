import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });

describe('<App />', () => {
    it('renders app div', () => {
        const editor = shallow(<App />);
        expect(editor.find('div').length).toEqual(1);
    });
});