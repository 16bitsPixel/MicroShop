import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Fragment } from 'react'
import { App } from '../views/App'

export default function Index() {
  return (
    <Fragment>
      <Head>
        <title>Micro Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </Fragment>
  )
}
