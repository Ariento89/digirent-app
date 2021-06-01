import { createAction } from 'redux-actions';

export const key = 'FILTERS';

export const types = {
  FILTER_BY_AVAILABLE_FROM: `${key}/FILTER_BY_AVAILABLE_FROM`,
  FILTER_BY_AVAILABLE_TO: `${key}/FILTER_BY_AVAILABLE_TO`,
  FILTER_BY_HOUSE_TYPE: `${key}/FILTER_BY_HOUSE_TYPE`,
  FILTER_BY_LOCATION: `${key}/FILTER_BY_LOCATION`,
  FILTER_BY_AMENITIES: `${key}/FILTER_BY_AMENITIES`,
  FILTER_BY_MIN_PRICE: `${key}/FILTER_BY_MIN_PRICE`,
  FILTER_BY_MAX_PRICE: `${key}/FILTER_BY_MAX_PRICE`,
  FILTER_BY_BATHROOMS: `${key}/FILTER_BY_BATHROOMS`,
  FILTER_BY_BEDROOMS: `${key}/FILTER_BY_BEDROOMS`,
  FILTER_BY_FURNISHING: `${key}/FILTER_BY_FURNISHING`,
  FILTER_BY_MINSQFT: `${key}/FILTER_BY_MINSQFT`,
  FILTER_BY_MAXSQFT: `${key}/FILTER_BY_MAXSQFT`,
  
};

export const actions = {
byAvailableFrom: createAction(types.FILTER_BY_AVAILABLE_FROM),
byAvailableTo: createAction(types.FILTER_BY_AVAILABLE_TO),
byHouseType: createAction(types.FILTER_BY_HOUSE_TYPE),
byLocation: createAction(types.FILTER_BY_LOCATION),
byAmenities: createAction(types.FILTER_BY_AMENITIES),
byMinPrice: createAction(types.FILTER_BY_MIN_PRICE),
byMaxPrice: createAction(types.FILTER_BY_MAX_PRICE),
byBathrooms: createAction(types.FILTER_BY_BATHROOMS),
byBedrooms: createAction(types.FILTER_BY_BEDROOMS),
byFurnishing: createAction(types.FILTER_BY_FURNISHING),
byMinSqft: createAction(types.FILTER_BY_MINSQFT),
byMaxSqft: createAction(types.FILTER_BY_MAXSQFT),
};
