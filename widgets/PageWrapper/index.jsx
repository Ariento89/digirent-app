import cn from 'classnames';
import { useMe } from 'hooks/useMe';
import Head from 'next/head';
import Loader from 'react-loader-spinner';
import Footer from 'widgets/Footer';
import Header from 'widgets/Header';
import NotVerified from './NotVerified';

const PageWrapper = ({ title, pageName, children, verificationRequired = false }) => {
  // const { language } = useLanguage();

  const { me } = useMe();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (window.initWeglot) {
  //     window.initWeglot();
  //   }
  // }, [title, language]);

  return (
    <div className="page-wrapper">
      <Head>
        <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js">
        </script>
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <title>{title}</title>
        {/* <script
          async
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZU-nw2CatyXuD1_zoe1rIPOJBGuA-vdg&libraries=places"
        /> */}
        {/* <script defer>{window.addEventListener('load', () => {
          Weglot.initialize({
            api_key: 'wg_ac3c0caf29a30b300b45bc7ba773a64e0'
          })
        })}</script> */}
      </Head>

      <Header />
      {(!verificationRequired || me?.emailVerified) && <div className={cn('layout-content', pageName)}>{children}</div>}
      {verificationRequired && !me?.emailVerified && <NotVerified />}
      <Footer />
    </div>
  );
};

export default PageWrapper;
