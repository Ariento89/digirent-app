import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import cn from 'classnames';
import { Formik, Field } from 'formik';
import { useState, useRef, useEffect } from 'react';
import { request } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import PropertyInfo from 'widgets/PropertyInfo/index';
import CustomSlider from 'widgets/customSlider/index';
import CssTextField from 'widgets/customPriceField/index';
import { AntTab, AntTabs } from 'widgets/customTabs/index';
import CustomCheckBox from 'widgets/customCheckbox/index';
import CustomRadioBtn from 'widgets/customRadioBtn/index';
import BootstrapInput from 'widgets/customSelect/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import TableHeader from 'widgets/TableHeader/index';
import { API_ASSET_URL } from 'services/index';
import AutoFillField from 'components/AutoFillField/index';
import axios from 'axios';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import DatePicker from '@material-ui/lab/DatePicker';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import DashboardOutlined from '@material-ui/icons/DashboardOutlined';
import Map from '@material-ui/icons/Map';

import InputAdornment from '@material-ui/core/InputAdornment';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Filter from './widgets/Filter';

import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  searchbox: {
    marginTop: '40px',
    marginBottom: '20px',
  },
  filterMenuWrapper: {
    position: 'absolute',
    zIndex: 2,
    right: '340px',
    top: '25px',
  },
}));

const outerTheme = createTheme({
  palette: {
    secondary: {
      main: '#41A2C9',
    },
  },
});

const PropertiesSearchResult = ({
  searchResultRef,
  properties,
  status,
  errors,
  location,
  onFiltersChanged,
}) => {
  const classes = useStyles();

  // STATES
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [houseTypes, setHouseTypes] = useState([]);
  const [minVal, setMinVal] = useState(30);
  const [maxVal, setMaxVal] = useState(2000);
  const [amenities, setAmenities] = useState([]);

  const [minPrice, setMinPrice] = useState(30);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [value, setValue] = useState(null);
  const router = useRouter();
  const [expanded, setExpanded] = useState('panel1');

  // hold filter value
  const [priceRange, setPriceRange] = useState({ min_price: 30, max_price: 2000 });
  const [filterObj, setFilterObj] = useState({});
  const [sortObj, setSortObj] = useState({});

  const [val, setVal] = useState('1');

  const [open, setOpen] = useState(false);

  const handleChanges = (event, newVal) => {
    setVal(newVal);
  };

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // METHODS
  const onPageChange = (newList, pagination) => {
    setList(newList);
    setPaginationData(pagination);
  };

  function valuetext(val) {
    return `${val}°C`;
  }

  const handleAllChange = (event, newValue) => {
    let vale;
    if (newValue[0] !== minPrice) {
      event.target.name = 'min_price';
      vale = newValue[0];
    } else {
      event.target.name = 'max_price';
      vale = newValue[1];
    }
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);

    const params = {
      [event.target.name]: vale,
    };
    console.log(params);
    setPriceRange((prevValue) => ({
      ...prevValue,
      [event.target.name]: vale,
    }));
  };

  // get filtered properties
  const handleComplete = () => {
    onFiltersChanged(priceRange);
    console.log('my prces', priceRange);
  };

  // get sort option
  const onSortChange = (value) => {
    setSortObj({...value});
    onFiltersChanged({...value, ...filterObj});
  }

  let num;

  useEffect(() => {
    const fetchHouseTypes = async () => {
      const result = await axios('/apartments/house-types');
      const types = result.data.map((type) => ({ name: type, value: type }));
      num = types.length;
      setHouseTypes(types);
      // setHouseTypes([types, num]);
    };

    const fetchRange = async () => {
      const result = await axios('/apartments');
      const types = result.data;
      const maxp = Math.max.apply(
        Math,
        types.map((o) => o.monthlyPrice),
      );
      const minp = Math.min.apply(
        Math,
        types.map((o) => o.monthlyPrice),
      );
      // console.log(minp, maxp)
      setMinVal(minp);
      setMaxVal(maxp);
    };

    const fetchMaxPrice = async () => {
      const result = await axios('/apartments');
      // fetch all the houses and compare the prices to get the lowest.
    };

    const fetchAmenities = async () => {
      const result = await axios('/amenities');
      const types = result.data.map((type) => ({ name: type, value: type }));

      setAmenities(types);
    };

    fetchHouseTypes();
    fetchAmenities();
    fetchRange();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <Spinner loadingText="Searching properties..." isLoading={status === request.REQUESTING}>
        <div ref={searchResultRef} className="rental-houses">
          <div className={classes.searchbox}>
            <AutoFillField
              selected={(lbl, latitude, longitude) => {
                console.log('finished here', latitude, longitude);
                onFiltersChanged({ longitude: longitude, latitude: latitude });
              }}
              height="55px"
              width="270px"
              border="3"
              placeholder="Where will you go?"
              icon="icon-map-marker-primary"
              name="location"
              borderColor="#41A2F9"
            />
          </div>
          <p className="main-subtitle mt-1 mt-md-2 dark-gray" style={{ textAlign: 'left' }}>
            {properties.length} properties for rent in {location || 'Netherlands'}
          </p>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabContext value={val}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                <div className={classes.filterMenuWrapper}>
                  <Filter
                    onSortChange={onSortChange}
                  />
                </div>
                <AntTabs onChange={handleChanges} aria-label="places views">
                  <AntTab icon={<DashboardOutlined />} label="Gallery" value="1" />
                  <AntTab icon={<Map />} label="Map" value="2" />
                </AntTabs>
              </Box>

              <div className="flex" style={{ marginLeft: '-15px' }}>
                <div className="flex-col">
                  <div className="bg-white rounded-lg w-80 col-xl-12">
                    <div className="px-4 py-5 sm:px-6 bg-blue-400 mb-4">
                      <h3 className="text-xl leading-6 font-medium text-white">Filter</h3>
                    </div>
                    <Formik
                      initialValues={{}}
                      onSubmit={(values, { setSubmitting }) => {
                        setFilterObj({...values});
                        onFiltersChanged({...values, ...sortObj});
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <div className="input-fields">
                            <Accordion
                              expanded={expanded === 'panel1'}
                              onChange={handleAccordionChange('panel1')}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>Price Range</Typography>
                              </AccordionSummary>
                              <AccordionDetails style={{ marginTop: '-5px' }}>
                                <CustomSlider
                                  min={minVal}
                                  max={maxVal}
                                  value={[minPrice, maxPrice]}
                                  onChange={handleAllChange}
                                  onChangeCommitted={() => {
                                    setFieldValue('max_price', maxPrice);
                                    setFieldValue('min_price', minPrice);
                                    handleComplete();
                                  }}
                                  getAriaValueText={valuetext}
                                />
                                <Box
                                  component="form"
                                  sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' } }}
                                  noValidate
                                  autoComplete="off"
                                  style={{ marginLeft: '-10px' }}
                                >
                                  <div className="flex">
                                    <CssTextField
                                      value={minPrice}
                                      name="min_price"
                                      label="Min Price"
                                      id="outlined-size-normal"
                                      onChange={(vale) => {
                                        handleChange(vale);
                                        setMinPrice(vale.target.value);
                                      }}
                                      onBlur={handleSubmit}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">EUR</InputAdornment>
                                        ),
                                        step: 10,
                                        min: minVal,
                                        max: maxVal,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                      }}
                                    />

                                    <CssTextField
                                      style={{ marginLeft: '15px', marginRight: '0px' }}
                                      value={maxPrice}
                                      name="max_price"
                                      label="Max Price"
                                      id="outlined-size-normal"
                                      onChange={(vale) => {
                                        handleChange(vale);
                                        setMaxPrice(vale.target.value);
                                      }}
                                      onBlur={handleSubmit}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">EUR</InputAdornment>
                                        ),
                                        step: 10,
                                        min: minVal,
                                        max: maxVal,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                      }}
                                    />
                                  </div>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                              >
                                <Typography>House Type</Typography>
                              </AccordionSummary>
                              <AccordionDetails style={{ marginTop: '-30px' }}>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                                  <div className="sm:col-span-4">
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <ul className="block text-sm font-medium text-gray-700">
                                        <RadioGroup
                                          aria-label="house type"
                                          name="house_type"
                                          value={value}
                                          onChange={handleChange}
                                        >
                                          <FormControlLabel
                                            value="studio"
                                            onChange={handleSubmit}
                                            control={
                                              <CustomRadioBtn
                                                checked={values.house_type === 'studio'}
                                              />
                                            }
                                            label="Studio"
                                          />
                                          <FormControlLabel
                                            value="apartment"
                                            onChange={handleSubmit}
                                            onClick={() => setOpen(!open)}
                                            control={
                                              <CustomRadioBtn
                                                checked={values.house_type === 'apartment'}
                                              />
                                            }
                                            label="Apartment"
                                          />
                                          <RadioGroup
                                            aria-label="room"
                                            name="min_bedrooms"
                                            value={value}
                                            onChange={handleChange}
                                            style={{
                                              marginLeft: '30px',
                                              display: open ? 'block' : 'none',
                                            }}
                                          >
                                            <FormControlLabel
                                              value="1"
                                              onChange={handleSubmit}
                                              control={
                                                <CustomRadioBtn
                                                  checked={values.min_bedrooms === '1'}
                                                />
                                              }
                                              label="1 bedroom"
                                            />
                                            <FormControlLabel
                                              value="2"
                                              onChange={handleSubmit}
                                              control={
                                                <CustomRadioBtn
                                                  checked={values.min_bedrooms === '2'}
                                                />
                                              }
                                              label="2 bedroom"
                                            />
                                            <FormControlLabel
                                              value="3"
                                              onChange={handleSubmit}
                                              control={
                                                <CustomRadioBtn
                                                  checked={values.min_bedrooms === '3'}
                                                />
                                              }
                                              label="3 bedroom"
                                            />
                                            <FormControlLabel
                                              value="4"
                                              onChange={handleSubmit}
                                              control={
                                                <CustomRadioBtn
                                                  checked={values.min_bedrooms === '4'}
                                                />
                                              }
                                              label="4+ bedroom"
                                            />
                                          </RadioGroup>
                                          <FormControlLabel
                                            value="shared_room"
                                            onChange={handleSubmit}
                                            control={
                                              <CustomRadioBtn
                                                checked={values.house_type === 'shared_room'}
                                              />
                                            }
                                            label="Shared Room"
                                          />
                                          <FormControlLabel
                                            value="private_room"
                                            onChange={handleSubmit}
                                            control={
                                              <CustomRadioBtn
                                                checked={values.house_type === 'private_room'}
                                              />
                                            }
                                            label="Private Room"
                                          />
                                        </RadioGroup>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                              >
                                <Typography>Select Date</Typography>
                              </AccordionSummary>
                              <AccordionDetails style={{ marginTop: '-15px' }}>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                                  <CssTextField
                                    defaultValue="2020-06-10"
                                    label="Move In"
                                    name="available_from"
                                    onChange={(vale) => {
                                      handleChange(vale);
                                      handleSubmit();
                                    }}
                                    type="date"
                                    variant="outlined"
                                    format="mm/dd/yyyy"
                                  />

                                  <CssTextField
                                    defaultValue="2020-06-10"
                                    label="Move Out"
                                    name="available_to"
                                    onChange={(vale) => {
                                      handleChange(vale);
                                      handleSubmit();
                                    }}
                                    type="date"
                                    variant="outlined"
                                    format="mm/dd/yyyy"
                                  />
                                </div>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel7a-content"
                                id="panel7a-header"
                              >
                                <Typography>Furnishing</Typography>
                              </AccordionSummary>
                              <AccordionDetails style={{ marginTop: '-28px' }}>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                                  <div className="sm:col-span-4">
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <RadioGroup
                                        aria-label="furnishing"
                                        name="furnish_type"
                                        value={value}
                                        onChange={handleChange}
                                      >
                                        <FormControlLabel
                                          value="unfurnished"
                                          onChange={handleSubmit}
                                          control={
                                            <CustomRadioBtn
                                              checked={values.furnish_type === 'unfurnished'}
                                            />
                                          }
                                          label="Unfurnished"
                                        />
                                        <FormControlLabel
                                          value="furnished"
                                          onChange={handleSubmit}
                                          control={
                                            <CustomRadioBtn
                                              checked={values.furnish_type === 'furnished'}
                                            />
                                          }
                                          label="Furnished"
                                        />
                                      </RadioGroup>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel8a-content"
                                id="panel8a-header"
                              >
                                <Typography>House Size</Typography>
                              </AccordionSummary>
                              <AccordionDetails style={{ marginTop: '-25px' }}>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                                  <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' } }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <div className="flex">
                                      <CssTextField
                                        id="minsqft"
                                        name="min_size"
                                        label="minsqft"
                                        onChange={handleChange}
                                        onBlur={values.min_size && handleSubmit}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">Sq</InputAdornment>
                                          ),
                                          min: 10,
                                          type: 'number',
                                          'aria-labelledby': 'input-slider',
                                        }}
                                      />
                                      <CssTextField
                                        id="maxsqft"
                                        name="max_size"
                                        label="maxsqft"
                                        onChange={handleChange}
                                        onBlur={values.max_size && handleSubmit}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">Sq</InputAdornment>
                                          ),
                                          min: 10,
                                          type: 'number',
                                          'aria-labelledby': 'input-slider',
                                        }}
                                      />
                                    </div>
                                  </Box>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel9a-content"
                                id="panel9a-header"
                              >
                                <Typography>Amenities</Typography>
                              </AccordionSummary>
                              <AccordionDetails style={{ marginTop: '-25px' }}>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                                  <div className="sm:col-span-4">
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <FormGroup aria-label="amenities_type group">
                                        {amenities.map((am) => (
                                          <div>
                                            <div className="left-section flex items-center">
                                              <FormControlLabel
                                                control={
                                                  <CustomCheckBox
                                                    id={am.name.id}
                                                    name="ameneties"
                                                    value={am.name.id}
                                                    onChange={(vale) => {
                                                      console.log(vale.target.id);
                                                      handleChange(vale);
                                                      handleSubmit();
                                                    }}
                                                    color="primary"
                                                  />
                                                }
                                                label={am.name.title}
                                              />
                                            </div>
                                          </div>
                                        ))}
                                      </FormGroup>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>

                <TabPanel value="1" className="flex-1">
                  <div className={cn("row list flex-1 mt-0", {'h-full': request.SUCCESS && !properties?.length})}>
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
                        {properties.map((property) => (
                          <div key={property.id} className="item col-md-12 col-lg-6 col-xl-4">
                            <PropertyInfo
                              link={`/properties/${property.id}`}
                              houseImage={property.images}
                              name={property.name}
                              address={property.state}
                              rentFee={property.monthlyPrice}
                              houseType={property.houseType}
                              bedrooms={property.bedrooms}
                              bathrooms={property.bathrooms}
                              size={property.size}
                              availableFrom={property.availableFrom}
                              propId={property.id}
                            />
                          </div>
                        ))}
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
                </TabPanel>
              </div>

              <Pagination className="mt-5" list={properties} onPageChange={onPageChange} />
              <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
          </Box>
        </div>
      </Spinner>
    </div>
  );
};

export default PropertiesSearchResult;
