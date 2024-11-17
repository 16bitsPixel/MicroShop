import React, { useEffect } from 'react';
import Head from 'next/head';
import { Fragment } from 'react';
import { useKeycloak } from '@react-keycloak/web'; // Assuming you're using this hook for Keycloak
import { useRouter } from 'next/router';
import { CreateView } from '@/views/Create';

export default function CreatePage() {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();

  // Check if Keycloak is initialized and the user is authenticated
  useEffect(() => {
    if (initialized && !keycloak?.authenticated) {
      // Redirect to home page if not authenticated
      router.push('/');
    }
  }, [initialized, keycloak?.authenticated, router]);

  if (!initialized) {
    return <div>Loading...</div>; // Or a loading spinner to show while Keycloak is initializing
  }

  if (!keycloak?.authenticated) {
    return null; // No need to render anything while redirecting
  }

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateView token = {keycloak.token} />
    </Fragment>
  );
}
