
import {mount, shallow} from 'enzyme';
import React from 'react';
import CookiePolicy from 'ui/components/CookiePolicy/CookiePolicy';
import {Entity} from "game-platform";

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders before cookie consent', () => {
    let wrapper = mount(<CookiePolicy/>);

    expect(wrapper.find('.cookiePolicy').length).toBe(1);

    wrapper.find('.btnItem').simulate('click');
    expect(wrapper.html()).toBe(null);

    // now with a stored cookie
    let wrapper2 = mount(<CookiePolicy/>);
    expect(wrapper2.html()).toBe(null);
  });
});