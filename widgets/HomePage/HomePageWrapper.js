/* eslint-disable no-undef */
import { useLanguage } from 'hooks/useLanguage';
import Head from 'next/head';
import Footer from 'widgets/Footer';
import HomePageHeader from 'widgets/HomePage/HomePageHeader';

const HomePageWrapper = ({ title, onLoginClick, onRegisterClick, children }) => {
  const { language } = useLanguage();

  return (
    <div className="page-wrapper">
      <Head>
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

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.Widget = { key: '5f89dd860307c' };
              (function (e, t) {
              var n = e.createElement(t);
              n.async = true;
              n.src = 'https://static.futy-widget.com/js/widget.js';
              var r = e.getElementsByTagName(t)[0];
              r.parentNode.insertBefore(n, r);
              })(document, 'script');
                  `,
          }}
        ></script>

        <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if(typeof Weglot !== 'undefined') {
                if(!Weglot.initialized) {
                  Weglot.initialize({api_key: 'wg_8fa89c444075cf79dc5825b3457396ab5', hide_switcher: true});
                  window.Weglot = Weglot;
                  Weglot.switchTo('${language}');  
                } else {
                  Weglot.switchTo('${language}');  
                }
              }
            `,
          }}
        ></script>
      </Head>

      <HomePageHeader onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default HomePageWrapper;
