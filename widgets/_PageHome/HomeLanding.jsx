import AutoFillField from 'components/AutoFillField/index';
import InputDatePicker from 'components/InputDatePicker/index';
import { useState } from 'react';
import Router from 'next/router';
import dayjs from 'dayjs';

const HomeLanding = () => {
  const [label, setLabel] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const search = () => {
    let f = '';
    let t = '';
    if (from) {
      f = dayjs(from).format('YYYY-MM-DD');
    }
    if (to) {
      t = dayjs(to).format('YYYY-MM-DD');
    }
    console.log(from, to);
    Router.push({ pathname: '/properties', query: { label, from: f, to: t, lat, lng } });
  };
  return (
    <div className="landing">
      <p className="title">
        RENTING DONE <span className="alt">DIGITALLY</span>
      </p>

      <div className="input-fields">
        <AutoFillField
          selected={(lbl, latitude, longitude) => {
            setLabel(lbl);
            setLat(latitude);
            setLng(longitude);
          }}
          height="45px"
          width="250px"
          placeholder="Where will you go?"
          icon="icon-map-marker-primary"
        />
        <InputDatePicker
          onDayClick={(d) => {
            setFrom(d);
          }}
          classNames="mx-md-3"
          placeholder="Move-in date"
          icon="icon-calendar-gray"
        />
        <InputDatePicker
          onDayClick={(d) => {
            setTo(d);
          }}
          classNames="mr-md-3"
          placeholder="Move-out date"
          icon="icon-calendar-gray"
        />
        <button onClick={search} className="button min-width">
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default HomeLanding;
