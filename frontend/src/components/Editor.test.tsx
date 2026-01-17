import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Editor from './Editor';

describe('Editor component', () => {
  test('renders and updates title and content', () => {
    render(<Editor />);

    const titleInput = screen.getByDisplayValue('Untitled') as HTMLInputElement;
    expect(titleInput).toBeTruthy();

    fireEvent.change(titleInput, { target: { value: 'My Title' } });
    expect(titleInput.value).toBe('My Title');

    const contentNode = screen.getByText('Start writing here...');
    expect(contentNode).toBeTruthy();

    fireEvent.input(contentNode, { target: { innerHTML: '<p>Hello</p>' } });
    expect(contentNode.innerHTML).toContain('Hello');
  });
});
