import React from 'react';
import styled from 'styled-components';
import StarIcon from '.';

const Wrapper = styled.div`
  background-color: #ddd;
`;

export default {
  title: 'molecules/StarIcon',
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>]
};

export const on = () => <StarIcon on />;
export const off = () => <StarIcon />;
