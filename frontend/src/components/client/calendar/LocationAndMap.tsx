import { MapPinIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, useEffect, useState } from "react";
import GoogleMap from "./GoogleMap";
import { Country, State, City } from 'country-state-city';

interface ClientAddFormData {
  jobTitle: string;
  time: string;
  location: {
    country: string;
    state: string;
    district: string;
    city: string;
    mapLocation?: { lat: number; lng: number };
  };
  description: string;
}

interface LocationType {
  mapLocation: boolean;
  toggleMapLocation: () => void;
  formData: ClientAddFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ClientAddFormData>>;
}

interface CountryType {
  isoCode: string;
  name: string;
  flag: string;
  phonecode: string;
  latitude: string;
  longitude: string;
  currency: string;
}

interface StateType {
  isoCode: string;
  name: string;
  countryCode: string;
}

interface CityType {
  name: string;
  stateCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

const LocationAndMap: React.FC<LocationType> = ({
  mapLocation,
  toggleMapLocation,
  formData,
  handleInputChange,
  setFormData,
}) => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [states, setStates] = useState<StateType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);

  // Fetch all countries when the component mounts
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Fetch states based on the selected country
  useEffect(() => {
    const selectedCountry = countries.find(country => country.name === formData.location.country);
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    } else {
      setStates([]);
    }
  }, [formData.location.country, countries]);

  // Fetch cities based on the selected state
  useEffect(() => {
    const selectedState = states.find(state => state.name === formData.location.state);
    const selectedCountry = countries.find(country => country.name === formData.location.country);
    if (selectedState && selectedCountry) {
      setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
    } else {
      setCities([]);
    }
  }, [formData.location.state, states, countries]);

  return (
    <div>
      <h6 className="text-blue-600 text-sm hover:text-blue-700">Location</h6>
      <div className="flex items-center gap-3 my-4">
        <select
          name="country"
          value={formData.location.country}
          onChange={handleInputChange}
          className="block w-full border text-xs outline-none p-1 border-gray-300 rounded-sm mb-2"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        {formData.location.country && (
          <select
            name="state"
            value={formData.location.state}
            onChange={handleInputChange}
            className="block w-full text-xs outline-none border p-1 border-gray-300 rounded-sm mb-2"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        )}

        {formData.location.state && (
          <select
            name="district"
            value={formData.location.district}
            onChange={handleInputChange}
            className="block w-full outline-none text-xs border p-1 border-gray-300 rounded-sm mb-2"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {formData.location.district && (
        <div className="flex items-center space-x-2">
          <MapPinIcon onClick={toggleMapLocation} className="h-6 w-6 cursor-pointer text-gray-400" />
          <input
            type="text"
            value={`${formData.location.country}, ${formData.location.state}, ${formData.location.district}`}
            readOnly
            className="flex-grow border-b border-gray-300 text-xs pb-2 placeholder:text-gray-300 focus:border-blue-500 outline-none"
            placeholder="Add location"
          />
        </div>
      )}

      {mapLocation && (
        <GoogleMap
          onSelectLocation={(latLng) => {
            setFormData((prevData) => ({
              ...prevData,
              location: { ...prevData.location, mapLocation: latLng },
            }));
          }}
        />
      )}
    </div>
  );
};

export default LocationAndMap;
