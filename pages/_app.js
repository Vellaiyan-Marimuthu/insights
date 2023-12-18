import Header from '@/components/core/header'
import '@/styles/globals.css'
import 'react-vis/dist/style.css';

import Head from 'next/head'
import { useReducer } from 'react';
import { getApplicationInitialState, getApplicationReducer } from '@/context/applicationContext';

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <header>
        <Header {...pageProps} />
      </header>
      <main className='main_container h-[calc(100vh-70px)]'>
        <Component {...pageProps} />
      </main>


    </>
  )
}
