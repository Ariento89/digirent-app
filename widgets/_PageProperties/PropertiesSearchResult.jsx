import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import { useState, useEffect } from 'react';
import { request } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import PropertyInfo from 'widgets/PropertyInfo/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import TableHeader from 'widgets/TableHeader/index';
import { API_ASSET_URL } from 'services/index';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import axios from 'axios';

const PropertiesSearchResult = ({ searchResultRef, properties, status, errors, location }) => {
  // STATES
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [houseTypes, setHouseTypes] = useState([]);
  const [amenities, setAnemities] = useState([]);

  // METHODS
  const onPageChange = (newList, pagination) => {
    setList(newList);
    setPaginationData(pagination);
  };

  useEffect(() => {
    const fetchHouseTypes = async () => {
      const result = await axios('/apartments/house-types');
      const types = result.data.map((type) => ({ name: type, value: type }));
      setHouseTypes(types);
    };

    const fetchAnemities = async () => {
      const result = await axios('/amenities');
      const types = result.data.map((type) => ({ name: type, value: type }));

      setAnemities(types);
    };

    fetchHouseTypes();
    fetchAnemities();
  }, []);

  return (
    <div className="containerx mx-auto px-4 sm:px-6 lg:px-16">
      <Spinner loadingText="Searching properties..." isLoading={status === request.REQUESTING}>
        <div ref={searchResultRef} className="rental-houses">
          <h3 className="main-title">
            RENTAL HOUSE IN{' '}
            <span className="text-primary font-weight-bold">
              {location ? location.toUpperCase() : 'NETHERLANDS'}
            </span>
          </h3>
          <p className="main-subtitle mt-1 mt-md-2 dark-gray">
            {properties.length} NEW RENTAL PROPERTIES IN{' '}
            {location ? location.toUpperCase() : 'NETHERLANDS'} IN THE LAST 30 DAYS
          </p>

          {!!errors?.length && (
            <div className="my-3">
              {errors?.map((error) => (
                <FieldError error={error} />
              ))}
            </div>
          )}

          {/* LIST */}
          {status === request.SUCCESS && !!properties?.length && (
            <>
              {/* <TableHeader
                classNames="rental-houses-table-header mt-5"
                currentPage={paginationData.currentPage}
                maxPage={paginationData.currentPage}
              /> */}

              <div className="flex">
                <div className="flex-col">
                  <div className="bg-white overflow-hidden shadow rounded-lg w-60 xl:w-96 mt-7">
                    <div className="px-4 py-5 sm:px-6 bg-blue-500 mb-4">
                      <h3 className="text-xl leading-6 font-medium text-white">
                        Filter
                      </h3>
                    </div>
                    <div className="px-4 pb-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <GooglePlacesAutocomplete
                              apiKey="AIzaSyAZU-nw2CatyXuD1_zoe1rIPOJBGuA-vdg"
                              selectProps={{
                                placeholder: 'City',
                                styles: {
                                  container: (provided) => ({
                                    ...provided,
                                    width: '100%',
                                  }),
                                  placeholder: (provided) => ({
                                    ...provided,
                                    color: '#d0d3d4',
                                  }),
                                  control: (provided) => ({
                                    ...provided,
                                    // width,
                                    // height,
                                    paddingLeft: '16px',
                                    borderRadius: '4px',
                                    border: '0',
                                    color: '#7f7f7f',
                                    boxShadow: '0 1px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)',
                                    fontFamily: 'Proxima Nova, sans-serif',
                                    fontWeight: '300',
                                    fontSize: '16px',
                                    lineHeight: '100%',
                                    margin: '0',
                                  }),
                                  indicatorSeparator: () => {},
                                },
                              }}
                              autocompletionRequest={{
                                componentRestrictions: {
                                  country: ['nl'],
                                },
                                types: ['(cities)'],
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            House Type
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option>Any</option>
                              {
                                houseTypes.map((ht) => <option key={ht.name}>{ht.name}</option>)
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-8 gap-y-6 gap-x-4 mt-4">
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Min Price
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input placeholder="0" id="location" name="location" type="number" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Max Price
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input placeholder="0" id="location" name="location" type="number" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Bedrooms
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option>Any</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Bathrooms
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option>Any</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Finishing
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option>Furnished</option>
                              <option>Unfurnished</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-8 gap-y-6 gap-x-4 mt-4">
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Min Sqtft
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input placeholder="0" id="location" name="location" type="number" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <span htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Max Sqtft
                          </span>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input placeholder="0" id="location" name="location" type="number" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-1 mt-4">
                        <div>
                          <legend className="text-base font-medium text-gray-900">Amenities</legend>
                        </div>

                        {
                          amenities.map((ht) => (
                            <div key={ht.name.id} className="space-y-4">
                              <div className="flex items-center">
                                <input id="comments" name="comments" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <span htmlFor="push_everything" className="ml-3 block text-sm font-medium text-gray-700">
                                  {ht.name.title}
                                </span>
                              </div>
                            </div>
                          ))
                        }

                        {/* <div className="space-y-4">
                          <div className="flex items-center">
                            <input id="comments" name="comments" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <span htmlFor="push_everything" className="ml-3 block text-sm font-medium text-gray-700">
                              AMTest-1
                            </span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input id="comments" name="comments" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <span htmlFor="push_everything" className="ml-3 block text-sm font-medium text-gray-700">
                              AMTest-2
                            </span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input id="comments" name="comments" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <span htmlFor="push_everything" className="ml-3 block text-sm font-medium text-gray-700">
                              swimming pools
                            </span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input id="comments" name="comments" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <span htmlFor="push_everything" className="ml-3 block text-sm font-medium text-gray-700">
                              party rooms
                            </span>
                          </div>
                        </div> */}

                      </div>
                    </div>
                    <div>
                      <div className="flex justify-end pb-4 pr-4">
                        <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row list flex-1 mt-0">
                  {list.map((property) => (
                    <div key={property.id} className="col-md-12 col-lg-6 col-xl-4">
                      <PropertyInfo
                        link={`/properties/${property.id}`}
                        houseImage={
                          property.images && property.images.length > 0
                            ? `${API_ASSET_URL}${property.images[0]}`
                            : '"/images/house-sample-2.jpg"'
                        }
                        name={property.name}
                        address={property.address}
                        rentFee={property.monthlyPrice}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Pagination className="mt-5" list={properties} onPageChange={onPageChange} />
            </>
          )}

          {/* EMPTY */}
          {status === request.SUCCESS && !properties?.length && (
            <StateList
              className="mx-auto"
              title="LIST IS EMPTY"
              description="No properies found."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {status === request.ERROR && (
            <StateList
              className="mx-auto"
              title="OOPS!"
              description="An error ocurred while fetching properties."
              type={stateListTypes.ERROR}
            />
          )}
        </div>
      </Spinner>
    </div>
  );
};

export default PropertiesSearchResult;
