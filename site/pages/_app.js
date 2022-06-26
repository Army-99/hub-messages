import '../styles/globals.css';
import { MainProvider } from '../context/MainContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return <MainProvider>
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </MainProvider>
}

export default MyApp
