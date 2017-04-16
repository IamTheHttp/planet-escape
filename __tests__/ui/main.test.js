/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import MainView from 'ui/main';
describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('renders the main view and bootstraps the game', function (done) {
      let wrapper = mount(<MainView></MainView>);
      //game takes some time to start up, let's guess it's 200 ms
      setTimeout(()=>{
        expect(Object.keys(wrapper.state().planetSection).length > 0).toBe(true);
        done();
      },200);
    });
});