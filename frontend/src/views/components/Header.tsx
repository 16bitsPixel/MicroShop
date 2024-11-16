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
              Login
            </Button>
          )}

          {!!keycloak.authenticated && (
            <Button 
              color="inherit"
              onClick={() => keycloak.logout()}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
