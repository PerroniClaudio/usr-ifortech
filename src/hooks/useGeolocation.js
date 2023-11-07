import useSWR from "swr";
import axios from "axios";

export const useGeolocation = (address, city, zipcode) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
  const fullAddress = `${address} ${city} ${zipcode}`;

  const { data, error, isLoading, mutate } = useSWR(
    `${baseUrl}?address=${fullAddress}&sensor=false&key=${
      import.meta.env.VITE_GEOLOCATON_KEY
    }`,
    (url) => axios(url).then((res) => res.data.results[0].geometry.location)
  );

  let latitude = data?.lat ?? 0;
  let longitude = data?.lng ?? 0;

  return {
    latitude,
    longitude,
    isLoading,
    mutate,
  };
};
