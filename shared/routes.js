import { role } from './types';

export const HOME_ROUTE = '/';

const ROUTES = {
  '/account': [role.LANDLORD, role.TENANT],
  '/property': [role.LANDLORD],
  '/property/add': [role.LANDLORD],
};

export default ROUTES;
