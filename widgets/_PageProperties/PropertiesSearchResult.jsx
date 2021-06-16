import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
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
  onNewSearch,
}) => {
  const classes = useStyles();

  // STATES
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [houseTypes, setHouseTypes] = useState([]);
  const [minVal, setMinVal] = useState(30);
  const [maxVal, setMaxVal] = useState(2000);
  const [amenities, setAmenities] = useState([]);

  const [label, setLabel] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);
  const [minPrice, setMinPrice] = useState(30);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [available_from, setAvailableFrom] = useState();
  const [available_to, setAvailableTo] = useState();
  const [value, setValue] = useState(null);
  const router = useRouter();
  const [expanded, setExpanded] = useState('panel1');

  // hold filter value
  const [priceRange, setPriceRange] = useState({ min_price: 30, max_price: 2000 });

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

  const handleNewSearch = ({ lbl, lat, lng }) => {
    console.log('Here is new search', lbl, lat, lng);
    router.push({ pathname: '/properties', query: { lbl, lat, lng } });
    //onNewSearch(data);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <Spinner loadingText="Searching properties..." isLoading={status === request.REQUESTING}>
        {/* <div className={classes.searchbox}>
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
        </div> */}
        <div ref={searchResultRef} className="rental-houses">
          {/* <h3 className="main-title">
            RENTAL HOUSE IN{' '}
            <span className="text-primary font-weight-bold">
              {location ? location.toUpperCase() : 'NETHERLANDS'}
            </span>
          </h3> */}
          <div className={classes.searchbox}>
            <AutoFillField
              selected={(lbl, latitude, longitude) => {
                // setLabel(lbl);
                // setLat(latitude);
                // setLng(longitude);
                console.log('finished here', latitude, longitude);
                onFiltersChanged({ longitude: longitude, latitude: latitude });
                //handleNewSearch({ lbl: lbl, lat: longitude, lng: latitude });
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
                    <Formik
                      initialValues={{}}
                      onSubmit={(values, { setSubmitting }) => {
                        // setTimeout(() => {
                        console.log(JSON.stringify(values, null, 2));
                        onFiltersChanged(values);
                        //   setSubmitting(false);
                        // }, 400);
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
                                      // onChange={handlePriceInput}
                                      // onBlur={priceQuickSearch}
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
                                      // onChange={handlePriceInput}
                                      // onBlur={priceQuickSearch}
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
                                          // onBlur={handleBlur}
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
                                            // onBlur={handleBlur}
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
                                        {/* {houseTypes.map((ht, index) => (
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
                                              </div>
                                            </div>
                                          </li>
                                        ))} */}
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
                                    // onBlur={handleSubmit}
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
                                    // onBlur={handleSubmit}
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
                                        // onBlur={handleBlur}
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
                                      {/* <ThemeProvider theme={outerTheme}>
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
                                      </ThemeProvider> */}
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
                                        // value={values.min_size}
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
                                        // value={values.max_size}
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
