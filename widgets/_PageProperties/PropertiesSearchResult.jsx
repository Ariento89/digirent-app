import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import { useState, useRef, useEffect } from 'react';
import { request } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import PropertyInfo from 'widgets/PropertyInfo/index';
import CustomSlider from 'widgets/customSlider/index';
import CssTextField from 'widgets/customPriceField/index';
import { AntTab, AntTabs } from 'widgets/customTabs/index';
import CustomCheckBox from 'widgets/customCheckbox/index';
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
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  searchbox: {
    position: 'fixed',
    top: 40,
    left: 280,
    zIndex: 3000,
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
  const [maxVal, setMaxVal] = useState(4600);
  const [amenities, setAmenities] = useState([]);

  const [label, setLabel] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [minPrice, setMinPrice] = useState(30);
  const [maxPrice, setMaxPrice] = useState(4600);
  const [available_from, setAvailableFrom] = useState();
  const [available_to, setAvailableTo] = useState();
  const [value, setValue] = useState(null);
  const router = useRouter();
  const [expanded, setExpanded] = useState('panel1');

  // hold filter value
  const [priceRange, setPriceRange] = useState({ min_price: 30, max_price: 4600 });

  const [val, setVal] = useState('1');

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

  const handleChange = (event, newValue) => {
    let value;
    if (newValue[0] !== minPrice) {
      event.target.name = 'min_price';
      value = newValue[0];
    } else {
      event.target.name = 'max_price';
      value = newValue[1];
    }
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);

    const params = {
      [event.target.name]: value,
    };
    console.log(params);
    // setPriceRange(params);
    setPriceRange((prevValue) => ({
      ...prevValue,
      [event.target.name]: value,
    }));
    // onFiltersChanged(params);
  };

  // get filtered properties
  const handleComplete = () => {
    onFiltersChanged(priceRange);
    console.log('my prces', priceRange);
  };

  const [state, setState] = useState({
    availableFrom: '',
    availableTo: '',
    // location: "",
    houseType: '',
    // min_price : "",
    // max_price : "",
    // ameni : "",
    // location : "",
    // min_bedrooms : "",
    // bathrooms : "",
    // minsqft : "",
    // maxsqft : "",
    // furnish_type : "",
  });

  const handlePriceInput = (evt) => {
    if (evt.target.name === 'min_price' && evt.target.value !== minPrice) {
      setMinPrice(evt.target.value);
      setPriceRange((prevValue) => ({
        ...prevValue,
        [evt.target.name]: evt.target.value,
      }));
    }

    if (evt.target.name === 'max_price' && evt.target.value !== maxPrice) {
      setMaxPrice(evt.target.value);
      setPriceRange((prevValue) => ({
        ...prevValue,
        [evt.target.name]: evt.target.value,
      }));
    }
  };

  const priceQuickSearch = () => {
    onFiltersChanged(priceRange);
  };

  const quickFilter = (evt) => {
    console.log('testing house type', evt.target.name, evt.target.value);
    // setPriceRange((prevValue) => ({
    //   ...prevValue,
    //   [evt.target.name]: evt.target.value,
    // }));

    priceRange[evt.target.name] = evt.target.value;

    onFiltersChanged(priceRange);
    console.log('this is me', priceRange);
  };

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
      var types = result.data;
      var maxp = Math.max.apply(
        Math,
        types.map(function (o) {
          return o.monthlyPrice;
        }),
      );
      var minp = Math.min.apply(
        Math,
        types.map(function (o) {
          return o.monthlyPrice;
        }),
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

  console.log('my searches from home', properties);
  console.log('home list', list);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <Spinner loadingText="Searching properties..." isLoading={status === request.REQUESTING}>
        <div className={classes.searchbox}>
          <AutoFillField
            selected={(lbl, latitude, longitude) => {
              setLabel(lbl);
              setLat(latitude);
              setLng(longitude);
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
        <div ref={searchResultRef} className="rental-houses">
          {/* <h3 className="main-title">
            RENTAL HOUSE IN{' '}
            <span className="text-primary font-weight-bold">
              {location ? location.toUpperCase() : 'NETHERLANDS'}
            </span>
          </h3> */}
          <p className="main-subtitle mt-1 mt-md-2 dark-gray" style={{ textAlign: 'left' }}>
            {properties.length} new properties for rent in {location ? location : 'Netherlands'}
          </p>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabContext value={val}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                            onChange={handleChange}
                            onChangeCommitted={handleComplete}
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
                                onChange={handlePriceInput}
                                onBlur={priceQuickSearch}
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
                                onChange={handlePriceInput}
                                onBlur={priceQuickSearch}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">EUR</InputAdornment>
                                  ),
                                  step: 10,
                                  min: { minVal },
                                  max: { maxVal },
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
                                  {houseTypes.map((ht, index) => {
                                    return (
                                      <li key={index}>
                                        <div className="block text-sm font-medium text-gray-700">
                                          <div className="left-section flex items-center">
                                            <FormControlLabel
                                              control={
                                                <CustomCheckBox
                                                  id={`custom-checkbox-${index}`}
                                                  name="house_type"
                                                  value={ht.name}
                                                  onChange={quickFilter}
                                                  color="primary"
                                                />
                                              }
                                              label={ht.name}
                                            />
                                            {/* <input
                                              type="checkbox"
                                              id={`custom-checkbox-${index}`}
                                              name="house_type"
                                              value={ht.name}
                                              onChange={quickFilter}
                                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                            />
                                            <label
                                              className="ml-3 block text-sm font-medium text-gray-700"
                                              htmlFor={`custom-checkbox-${index}`}
                                            >
                                              {ht.name}
                                            </label> */}
                                          </div>
                                          {/* <div className="right-section">20</div> */}
                                        </div>
                                      </li>
                                    );
                                  })}
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Move In"
                                value={available_from}
                                onChange={(newValue) => {
                                  setAvailableFrom(newValue);
                                }}
                                name="available-from"
                                renderInput={(params) => <CssTextField {...params} />}
                              />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Move Out"
                                value={available_to}
                                onChange={(newValue) => {
                                  setAvailableTo(newValue);
                                }}
                                name="available-to"
                                renderInput={(params) => <CssTextField {...params} />}
                              />
                            </LocalizationProvider>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel5a-content"
                          id="panel5a-header"
                        >
                          <Typography>Bedrooms</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ marginTop: '-25px' }}>
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 mt-4">
                            <div className="sm:col-span-4">
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <ThemeProvider theme={outerTheme}>
                                  <FormControl
                                    color="secondary"
                                    variant="outlined"
                                    className={classes.formControl}
                                  >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                      Bedrooms
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-outlined-label"
                                      id="min_bedrooms"
                                      name="min_bedrooms"
                                      defaultValue={1}
                                      onChange={quickFilter}
                                    >
                                      <MenuItem value={1}>1</MenuItem>
                                      <MenuItem value={2}>2</MenuItem>
                                      <MenuItem value={3}>3</MenuItem>
                                      <MenuItem value={4}>4</MenuItem>
                                      <MenuItem value={5}>5</MenuItem>
                                      <MenuItem value={6}>6</MenuItem>
                                    </Select>
                                  </FormControl>
                                </ThemeProvider>
                                {/* <select
                                  id="bedrooms"
                                  name="bedrooms"
                                  onChange={quickFilter}
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option>Any</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                </select> */}
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel6a-content"
                          id="panel6a-header"
                        >
                          <Typography>Bathrooms</Typography>
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
                                <div>
                                  <ThemeProvider theme={outerTheme}>
                                    <FormControl
                                      color="secondary"
                                      variant="outlined"
                                      className={classes.formControl}
                                    >
                                      <InputLabel id="demo-simple-select-outlined-label1">
                                        min
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-outlined-label1"
                                        id="min_bathrooms"
                                        name="min_bathrooms"
                                        defaultValue={1}
                                        onChange={quickFilter}
                                      >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </ThemeProvider>
                                  {/* <select
                                    id="bathrooms"
                                    name="min_bathrooms"
                                    onChange={quickFilter}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    <option>Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                  </select> */}
                                </div>
                                <div>
                                  <ThemeProvider theme={outerTheme}>
                                    <FormControl
                                      color="secondary"
                                      variant="outlined"
                                      className={classes.formControl}
                                    >
                                      <InputLabel id="demo-simple-select-outlined-label2">
                                        max
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-outlined-label2"
                                        id="max_bathrooms"
                                        name="max_bathrooms"
                                        defaultValue={1}
                                        onChange={quickFilter}
                                      >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </ThemeProvider>
                                  {/* <select
                                    id="bathrooms"
                                    name="max_bathrooms"
                                    onChange={quickFilter}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    <option>Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                  </select> */}
                                </div>
                              </div>
                            </Box>
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
                                <ThemeProvider theme={outerTheme}>
                                  <FormControl
                                    color="secondary"
                                    variant="outlined"
                                    className={classes.formControl}
                                  >
                                    <InputLabel id="demo-simple-select-outlined-label3">
                                      Furnishing
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-outlined-label3"
                                      id="funish_type"
                                      onChange={quickFilter}
                                      name="furnish_type"
                                      defaultValue="None"
                                    >
                                      <MenuItem value="Furnished">Furnished</MenuItem>
                                      <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                                    </Select>
                                  </FormControl>
                                </ThemeProvider>
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
                                  value="0"
                                  id="minsqft"
                                  name="minsqft"
                                  label="minsqft"
                                  onChange={quickFilter}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">Sq</InputAdornment>
                                    ),
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                  }}
                                />
                                <CssTextField
                                  value="0"
                                  id="maxsqft"
                                  name="maxsqft"
                                  label="maxsqft"
                                  onChange={quickFilter}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">Sq</InputAdornment>
                                    ),
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
                                <ul>
                                  {amenities.map((am) => {
                                    return (
                                      <li key={am.name.id} className="space-y-4">
                                        <div>
                                          <div className="left-section flex items-center">
                                            <FormControlLabel
                                              control={
                                                <CustomCheckBox
                                                  id={`custom-checkbox-${am.name.id}`}
                                                  name={am.name.title}
                                                  value={am.name.title}
                                                  onChange={quickFilter}
                                                  color="primary"
                                                />
                                              }
                                              label={am.name.title}
                                            />
                                          </div>
                                          <div className="right-section">20</div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                </div>

                <TabPanel value="1">
                  <div className="row list flex-1 mt-0">
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
