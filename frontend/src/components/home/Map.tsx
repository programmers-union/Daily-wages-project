import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Initialize Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicDRuYXZhcyIsImEiOiJjbTE3dHFwMTEwcWpqMmlzOGNwdXJpdXJkIn0.CWJYCmlaR2YEyuW3mChluQ'

interface MapViewState {
  lng: number
  lat: number
  zoom: number
}

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapView, setMapView] = useState<MapViewState>({
    lng: 77.5667,
    lat: 28.5667,
    zoom: 10
  })
  const [inputValue, setInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/p4navas/cm32x6oag000c01nw5rhhc8yc',
      center: [mapView.lng, mapView.lat],
      zoom: mapView.zoom
    })

    map.current.on('move', () => {
      if (map.current) {
        setMapView({
          lng: Number(map.current.getCenter().lng.toFixed(4)),
          lat: Number(map.current.getCenter().lat.toFixed(4)),
          zoom: Number(map.current.getZoom().toFixed(2))
        })
      }
    })
  }, [])

  const handleSearch = async () => {
    if (!inputValue.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(inputValue)}.json?access_token=${mapboxgl.accessToken}`)
      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        map.current?.flyTo({
          center: [lng, lat],
          zoom: 12
        })
        setMapView({
          lng: Number(lng.toFixed(4)),
          lat: Number(lat.toFixed(4)),
          zoom: 12
        })
      } else {
        setError('Location not found')
      }
    } catch (err) {
      setError('An error occurred while searching')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div >
      <div style={{ marginBottom: '16px' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a location"
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '8px'
          }}
        />
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoading ? 'Searching...' : 'Find'}
        </button>
      </div>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      <div ref={mapContainer} style={{ height: '300px', width: '100%', borderRadius: '8px', overflow: 'hidden' }} />
      {/* <div style={{ marginTop: '8px', fontSize: '14px', color: '#718096' }}>
        Longitude: {mapView.lng} | Latitude: {mapView.lat} | Zoom: {mapView.zoom}
      </div> */}
    </div>
  )
}

export default Map