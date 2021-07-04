/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Geocode from "react-geocode";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

Geocode.setApiKey("AIzaSyBdF3FcxvAquR1z3TkPLCfU9P2FpvLSWfA");
const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: props.lat, lng: props.lng };
  }

  mapClicked = (mapProps, map, clickEvent) => {
    this.setState({
      lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng(),
    });
    this.props.onPick(clickEvent.latLng.lat(), clickEvent.latLng.lng());
    Geocode.fromLatLng(clickEvent.latLng.lat(), clickEvent.latLng.lng()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        this.props.setFieldValue('country', country)
        this.props.setFieldValue('city', city)
        this.props.setFieldValue('state', state)
        this.props.setFieldValue('address', address)
      },
      (error) => {
        console.error(error);
      }
    );
      }

  render() {
    return (
      <div className="relative bg-white overflow-hidden shadow rounded-lg w-full h-56 mt-4">
        <h3 className="text-sm leading-6 font-medium text-gray-500 m-1">
          Click on the map to pick the exact location
        </h3>
        <Map
          google={this.props.google}
          onClick={this.mapClicked}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng,
          }}
        >
          <Marker
            key="1"
            name="1"
            position={{ lat: this.state.lat, lng: this.state.lng }}
            // icon={{
            //   url:
            //     `https://ui-avatars.com/api/?name=${
            //       order.num
            //     }&background=db2777&color=fff&bold=true&font-size=0.35&rounded=true&bold=true`,
            //   scaledSize: new this.props.google.maps.Size(40, 40),
            // }}
          />
        </Map>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBdF3FcxvAquR1z3TkPLCfU9P2FpvLSWfA',
})(MapContainer);
