import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Account from './Account';

configure({ adapter: new Adapter() });

describe('<Account />', () => {
    it('renders loading spinner', () => {
        const editor = shallow(<Account />);
        expect(editor.find('#loadingSpinner').length).toEqual(1);
    });
    it('mounts the component', () => {
        const dom = mount(<Account />);
        expect(dom.find('#accountLogOut').length).toEqual(0);
    });
});