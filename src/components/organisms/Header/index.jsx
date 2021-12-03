import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavigationLinks from '~/components/organisms/NavigationLinks';
import Typography from '~/components/atoms/Typography';

const Root = styled.div`
  width: 100%;
  display: flex;
`;

const StyledNavigationLinks = styled(NavigationLinks)`
  margin-left: auto;
`;

const Header = ({ className }) => (
  <Root className={className}>
    <Typography size="title" color="red" align="left">
      YouTube Viewer
    </Typography>
    <StyledNavigationLinks />
  </Root>
);

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;