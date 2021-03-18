/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AutoFillField = ({ width, height, placeholderColor, types,
  value, onChange, placeholder, icon, classNames, inputClassNames }) => {
  const [place, setPlace] = useState(null);

  return (
    <div className={cn('Input field-group', classNames)}>

      <GooglePlacesAutocomplete
        apiKey="AIzaSyAZU-nw2CatyXuD1_zoe1rIPOJBGuA-vdg"
        selectProps={{
          placeholder,
          place,
          onChange: setPlace,
          styles: {
            container: (provided) => ({
              ...provided,
              width: '100%',
            }),
            placeholder: (provided) => ({
              ...provided,
              color: placeholderColor,
            }),
            control: (provided) => ({
              ...provided,
              width,
              height,
              paddingLeft: icon ? '40px' : '16px',
              borderRadius: '20px',
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
          types: types || [],
        }}
      />
      {icon && (
        <>
          <div className="field-icon">
            <img src={`/images/icon/${icon}.svg`} alt="icon" />
          </div>
          {/* <span className="field-divider" /> */}
        </>
      )}

      {/* <input
        className={cn(inputClassNames, { 'no-icon': !icon })}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
      /> */}
    </div>
  );
};

AutoFillField.defaultProps = {
  placeholder: '',
};

export default AutoFillField;
