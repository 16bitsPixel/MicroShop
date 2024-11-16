import React from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router';

import { ProductView } from '@/views/Product';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductView id={id}/>
    </Fragment>
  )
}