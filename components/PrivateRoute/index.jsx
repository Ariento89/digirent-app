import LoadingPage from 'components/LoadingPage/index';
import { useAuthentication } from 'hooks/useAuthentication';
import { useMe } from 'hooks/useMe';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FALLBACK_LINK } from 'shared/constants';
import PRIVATE_ROUTES, { HOME_ROUTE } from 'shared/routes';

const PrivateRoute = ({ children }) => {
  // STATES
  const [loading, setLoading] = useState(false);

  // CUSTOM HOOKS
  const { accessToken } = useAuthentication();
  const { me } = useMe();
  const router = useRouter();

  // EFFECT: Check if of authorized
  useEffect(() => {
    setLoading(false);

    // Check if in homepage; Do nothing
    if (router.pathname === HOME_ROUTE) {
      setLoading(true);
      return;
    }

    const route = PRIVATE_ROUTES?.[router.pathname];
    // Check if still authorized
    if (route && !accessToken) {
      router.replace(FALLBACK_LINK).then(() => {
        setLoading(true);
      });
    }

    // Check if authorized
    if (route && !route?.includes(me?.role)) {
      router.replace(FALLBACK_LINK).then(() => {
        setLoading(true);
      });
    } else {
      setLoading(true);
    }
  }, [router, accessToken, me]);

  return loading ? children : <LoadingPage />;
};

export default PrivateRoute;
