import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: typeof google; // Correct type for google object
  }
}

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.google) {
        try {
           new window.google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });
        } catch (error) {
          console.error('Error loading Google Maps', error);
        }
      }
    };

    // Ensure the Google Maps API script is loaded before initializing the map
    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDFXRG1d6ydidZAT2iO3pGc-MKVavOnBsM`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  return <div ref={mapRef} style={{ height: '30vh', width: '100%' }} />;
};

export default GoogleMap;
