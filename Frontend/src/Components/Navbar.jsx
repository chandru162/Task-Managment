import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  marginRight: theme.spacing(2),
  '&.active': {
    fontWeight: 'bold',
  },
}));

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <StyledNavLink to="/" className="nav-link" activeClassName="active">
            <Button color="inherit">Home</Button>
          </StyledNavLink>
          <StyledNavLink to="/signup" className="nav-link" activeClassName="active">
            <Button color="inherit">Signup</Button>
          </StyledNavLink>
          <StyledNavLink to="/login" className="nav-link" activeClassName="active">
            <Button color="inherit">Login</Button>
          </StyledNavLink>
          <StyledNavLink to="/profile" className="nav-link" activeClassName="active">
            <Button color="inherit">Profile</Button>
          </StyledNavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;