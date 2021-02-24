// import Head from 'next/head';

/**
 * A tag Head funciona como a tag head do HTML, com isso conseguimos injetar
 * as fontes como podemos ver abaixo.
 */
import { ExperienceBar } from '../components/ExperienceBar';

export default function Home() {
  return (
    <>
    {/* <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
    </Head> */}
    <div className="container">
      <ExperienceBar />
    </div>
    </>
  );
}
