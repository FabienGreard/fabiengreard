import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="description" content={`Fabien Gréard blog.`} />
    </Head>
  );
}
