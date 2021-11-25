import React from 'react';
import { MemoryRouter } from 'react-router';
import { addDecorator } from '@storybook/react';

addDecorator(storyFn => (
  <MemoryRouter
    initialEntries={['/', 'posts']}
  >
    {storyFn()}
  </MemoryRouter>
));

