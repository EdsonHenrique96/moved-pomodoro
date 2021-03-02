import '../styles/global.css';

import { ChallengesPovider } from '../contexts/ChallengeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesPovider>
      <Component {...pageProps} />
    </ChallengesPovider>
  )
}

export default MyApp
