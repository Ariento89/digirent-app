import { role } from './types';

export const HOME_ROUTE = '/';

const ROUTES = {
  '/account': [role.LANDLORD, role.TENANT],
  '/my-properties': [role.LANDLORD],
  '/my-properties/add': [role.LANDLORD],
  '/my-properties/update/[id]': [role.LANDLORD],
};

export default ROUTES;
