/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import CreateNewPlayer from 'ui/components/PlayerSelection/CreateNewPlayer';
describe('Tests a component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CreateNewPlayer
    ></CreateNewPlayer>
    );
  });

  it('Changes the input and submits the form', (done) => {
    wrapper = mount(<CreateNewPlayer
      onSubmit={(userName) => {
        expect(userName).toBe('abcdefg');
        done();
      }}
      ></CreateNewPlayer>
    );

    wrapper.find('input').simulate('change', {
      target : {
        value: 'abcdefg'
      }
    });

    wrapper.find('button').simulate('click');
  });
});