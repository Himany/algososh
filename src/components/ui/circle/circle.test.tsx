import React from 'react';
import renderer from 'react-test-renderer';

import { Circle } from './circle';
import { ElementStates } from "../../../types/element-states";

describe('Circle test', () => {
  it('Circle without letter', () => {
    const tree = renderer
      .create(<Circle />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Circle with letter', () => {
    const tree = renderer
      .create(<Circle letter='T'/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Circle with letter in head', () => {
    const tree = renderer
      .create(<Circle head='T'/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with react element in head', () => {
    const tree = renderer
      .create(<Circle head={<h1>TEST</h1>}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with letter in tail', () => {
    const tree = renderer
      .create(<Circle tail='T'/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with react element in tail', () => {
    const tree = renderer
      .create(<Circle tail={<h1>TEST</h1>}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with index', () => {
    const tree = renderer
      .create(<Circle index={42}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with prop isSmall', () => {
    const tree = renderer
      .create(<Circle isSmall={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with state Default', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with state Changing', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
  it('Circle with state Modified', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
});



