import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

describe('Button test', () => {
  it('Button with text', () => {
    const tree = renderer
      .create(<Button text='TEST TEXT'/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Button without text', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Button disabled', () => {
    const tree = renderer
      .create(<Button disabled={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Button is load', () => {
    const tree = renderer
      .create(<Button isLoader={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Button callback', () => {
    const textCallBacak = () => {alert('TEST')};
    window.alert = jest.fn();
    render(<Button text="test_button" onClick={textCallBacak}/>)
    const button = screen.getByText("test_button");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('TEST');
  }); 
});



