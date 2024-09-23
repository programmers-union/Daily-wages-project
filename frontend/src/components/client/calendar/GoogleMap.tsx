import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapProps {
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ onClick }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.google) {
        try {
          const newMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });
          setMap(newMap);
        } catch (error) {
          console.error('Error loading Google Maps', error);
        }
      }
    };

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

  useEffect(() => {
    if (map && onClick) {
      const listener = map.addListener('click', onClick);
      return () => listener.remove();
    }
  }, [map, onClick]);

  return <div ref={mapRef} style={{ height: '30vh', width: '100%' }} />;
};

export default GoogleMap;