import LoadingPage from 'components/LoadingPage/index';
import { useMe } from 'hooks/useMe';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PRIVATE_ROUTES, { HOME_ROUTE } from 'shared/routes';

const PrivateRoute = ({ children }) => {
  // STATES
  const [loading, setLoading] = useState(false);

  // CUSTOM HOOKS
  const { me } = useMe();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    console.log(router.pathname);
    if (router.pathname === HOME_ROUTE) {
      setLoading(true);
      return;
    }

    const route = PRIVATE_ROUTES?.[router.pathname];
    if (route && !route?.includes(me?.role)) {
      router.replace('/').then(() => {
        setLoading(true);
      });
    } else {
      setLoading(true);
    }
  }, [router, me]);

  return loading ? children : <LoadingPage />;
};

export default PrivateRoute;
