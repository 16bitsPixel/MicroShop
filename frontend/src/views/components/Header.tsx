import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useKeycloak } from '@react-keycloak/web';

export default function Header() {
  const {keycloak, initialized} = useKeycloak();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href={`/`} passHref legacyBehavior>
            <Typography
              variant="h4"
              noWrap
              component="a" // Ensures it renders as an anchor tag
              sx={{
                color: 'inherit', // Inherits the AppBar text color (white)
                textDecoration: 'none', // Removes underline styling
                cursor: 'pointer', // Ensures it behaves like a clickable link
                fontWeight: 'bold',
              }}
            >
              Micro Shop
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          {!keycloak.authenticated && (
            <Button 
            color="inherit"
            onClick={() => keycloak.login()}
          >
            <Typography
              noWrap
              component="a" // Ensures it renders as an anchor tag
              sx={{
                color: 'inherit', // Inherits the AppBar text color (white)
                textDecoration: 'none', // Removes underline styling
                cursor: 'pointer', // Ensures it behaves like a clickable link
                fontWeight: 'bold',
                fontSize: {xs: '1rem', xl: '1.2rem'}
              }}
            >
              Login
            </Typography>
          </Button>
          )}

          {!!keycloak.authenticated && keycloak.hasRealmRole('vendor') && (
            <Box sx = {{display: 'flex', gap: 5}}>
              <Link href={`/create`} passHref legacyBehavior>
                <Button 
                  color="inherit"
                >
                  <Typography
                    noWrap
                    component="a" // Ensures it renders as an anchor tag
                    sx={{
                      color: 'inherit', // Inherits the AppBar text color (white)
                      textDecoration: 'none', // Removes underline styling
                      cursor: 'pointer', // Ensures it behaves like a clickable link
                      fontWeight: 'bold',
                      fontSize: {xs: '1rem', xl: '1.2rem'}
                    }}
                  >
                    Create Product
                  </Typography>
                </Button>
              </Link>

              <Button 
                color="inherit"
                onClick={() => keycloak.logout()}
              >
                <Typography
                  noWrap
                  component="a" // Ensures it renders as an anchor tag
                  sx={{
                    color: 'inherit', // Inherits the AppBar text color (white)
                    textDecoration: 'none', // Removes underline styling
                    cursor: 'pointer', // Ensures it behaves like a clickable link
                    fontWeight: 'bold',
                    fontSize: {xs: '1rem', xl: '1.2rem'}
                  }}
                >
                  Logout
                </Typography>
              </Button>
            </Box>
          )}

          {!!keycloak.authenticated && !keycloak.hasRealmRole('vendor') && (
            <Box sx = {{display: 'flex', gap: 5}}>
              <Button 
                color="inherit"
                onClick={() => keycloak.logout()}
              >
                <Typography
                  noWrap
                  component="a" // Ensures it renders as an anchor tag
                  sx={{
                    color: 'inherit', // Inherits the AppBar text color (white)
                    textDecoration: 'none', // Removes underline styling
                    cursor: 'pointer', // Ensures it behaves like a clickable link
                    fontWeight: 'bold',
                    fontSize: {xs: '1rem', xl: '1.2rem'}
                  }}
                >
                  Logout
                </Typography>
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
