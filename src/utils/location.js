import axios from 'axios';

const API_KEY = 'AIzaSyDtS3mnZo8kVypJZU7VFjeKcJjoKb4CFQA';

export const getMapPreview = (lat, lng) => {
  const mapPreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${API_KEY}`;

  return mapPreviewURL;
};

export const getAddress = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const response = await axios.get(url);

  return response.data.results[0].formatted_address;
};
