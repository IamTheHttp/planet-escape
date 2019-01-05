/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import CookiePolicy from 'ui/components/CookiePolicy/CookiePolicy';

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders before cookie consent', () => {
    let wrapper = mount(<CookiePolicy></CookiePolicy>);

    expect(wrapper.find('.cookiePolicy').length).toBe(1);

    wrapper.find('.btnItem').simulate('click');
    expect(wrapper.html()).toBe(null);

    // now with a stored cookie
    let wrapper2 = mount(<CookiePolicy></CookiePolicy>);
    expect(wrapper2.html()).toBe(null);
  });
});