import React from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router';
import { useKeycloak } from '@react-keycloak/web'; // Assuming you're using this hook for Keycloak

import { ProductView } from '@/views/Product';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { keycloak, initialized } = useKeycloak();

  // Extract user details if Keycloak is initialized
  const userDetails = initialized && keycloak.tokenParsed
    ? {
        email: keycloak.tokenParsed.email,
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
      }
    : null;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductView id={id} token = {keycloak.token} userDetails={userDetails} />
    </Fragment>
  )
}