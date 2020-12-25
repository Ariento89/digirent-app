import { useMe } from 'hooks/useMe';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PRIVATE_ROUTES } from 'shared/constants';

const PrivateRoute = ({ children }) => {
  const { me } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (PRIVATE_ROUTES.includes(router.pathname) && !me) {
      router.replace('/');
    }
  }, [router, me]);

  return children;
};

export default PrivateRoute;
