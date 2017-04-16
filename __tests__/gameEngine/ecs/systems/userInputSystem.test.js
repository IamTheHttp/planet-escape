/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import userInputSystem from 'gameEngine/ecs/systems/userInputSystem'
import {pushAction} from 'gameEngine/ecs/systems/userInputSystem'

describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('tests the user input system', function () {

      let ents = {
        '1' : {
          components : {
            'population' : {
              name : 'population',
              value : 1
            }
          }
        }
      };

      pushAction({
        name : 'addPop',
        entities : [1]
      });
      userInputSystem(ents);
      expect(ents[1].components['population'].value).toBe(2);
    });

  it('Tests an action without entities', function () {
    //pushing an action with no entities
    pushAction({
      name : 'addPop'
    });
    userInputSystem('asdsdfs'); //the system doesn't even process it's input if there are no valid actions
    //the success of this test is that nothing throws exceptions, since this function returns nothing
  });

  it('Tests an inavlid action(no name)', function () {
    //pushing an action with no entities
    pushAction({
      entities : [1]
    });
    userInputSystem('asdsdfs'); //the system doesn't even process it's input if there are no valid actions
    //the success of this test is that nothing throws exceptions, since this function returns nothing
  });

  it('Tests that an ent without populaiton is not affected', function () {

    let ents = {
      '1' : {
        components : {
        }
      }
    };

    pushAction({
      name : 'addPop',
      entities : [1]
    });
    userInputSystem(ents);
  });
});