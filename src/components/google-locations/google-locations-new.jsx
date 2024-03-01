import React, { useEffect, useRef, useState } from 'react'
import { Col, Grid, Row, Button, Loader } from 'rsuite'
import { TextInput } from '../elements'
import PropTypes from 'prop-types'
import { useUser } from '@/hooks/use-user'
import { useSaveUserLocation } from '@/api/user-location'

export const GoogleLocationsNew = ({ onClose }) => {
  const mapRef = useRef(null)
  const searchRef = useRef(null)
  const [loaded, setLoaded] = useState()
  const [loading, setLoading] = useState()
  const [map, setMap] = useState()
  const [marker, setMarker] = useState()
  const [location, setLocation] = useState()
  const [prevLocation, setPrevLocation] = useState()
  const [city, setCity] = useState()
  const { user } = useUser()

  const mutationSave = useSaveUserLocation(
    (oldData = [], newData) => [...oldData, newData],
    `/${user.id}`
  )

  const setSearchFocus = () => {
    if (!searchRef.current) {
      return
    }

    searchRef.current.focus()
    searchRef.current.placeholder = 'Buscar ubicación'
  }

  const setCurrentLocation = () => {
    if (!navigator.geolocation) {
      handleGeolocationError(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setPrevLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      () => handleGeolocationError(true)
    )
  }

  const setCurrentCity = () => {
    if (!location) return

    const { lat, lng } = location
    const latlng = new window.google.maps.LatLng(lat, lng)

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (
        status !== window.google.maps.GeocoderStatus.OK ||
        results.length <= 0
      ) {
        setLocation(prevLocation)
        return
      }

      const addresses = results[0].address_components
      const address = addresses.find((result) =>
        result.types.some((type) => type === 'locality')
      )
      const addressAux = addresses.find((result) =>
        result.types.some((type) => type === 'administrative_area_level_1')
      )
      const city = []
      if (addressAux?.long_name) {
        city.push(addressAux.long_name.replace('Provincia de ', ''))
      }
      if (address?.long_name) {
        city.push(address.long_name)
      }

      setCity(city.join(', '))
    })
  }

  const initializeMap = async () => {
    if (
      loaded ||
      map ||
      !location ||
      !city ||
      !mapRef.current ||
      !searchRef.current
    ) {
      return
    }

    const newMap = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: location,
      disableDefaultUI: true
    })

    const marker = new window.google.maps.Marker({
      map: newMap,
      title: city,
      draggable: true,
      position: location
    })

    const searchBox = new window.google.maps.places.SearchBox(searchRef.current)

    newMap.addListener('bounds_changed', () => {
      searchBox.setBounds(newMap.getBounds())
    })

    let markers = [marker]
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()

      if (places.length <= 0) {
        return
      }

      const place = places[0]

      if (!place.geometry || !place.geometry.location) {
        console.log('Returned place contains no geometry')
        return
      }

      const searchCity = place.name
      const searchLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      const searchMarker = new window.google.maps.Marker({
        map: newMap,
        draggable: true,
        title: searchCity,
        position: searchLocation
      })

      markers.forEach((marker) => marker.setMap(null))
      markers = [searchMarker]

      newMap.setOptions({
        center: searchLocation
      })

      setMap(newMap)
      setMarker(searchMarker)
      setLocation(searchLocation)
      setPrevLocation(searchLocation)
      setCity(searchCity)
    })

    setMap(newMap)
    setMarker(marker)
    setLoaded(true)
  }

  const addMarkerEvent = () => {
    if (!marker) return

    marker.addListener('mouseup', (event) => {
      setLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    })
  }

  const handleGeolocationError = (browserHasGeolocation) => () => {
    console.log(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesnt support geolocation.'
    )
  }

  const handleSaveLocation = async () => {
    try {
      if (loading) return
      setLoading(true)
      let newData = {
        lat: location.lat.toString(),
        lng: location.lng.toString(),
        city
      }

      const res = await mutationSave.mutateAsync(newData)
      if (res) {
        onClose()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentLocation()

    return () => {
      setCity()
      setMap()
      setMarker()
      setLocation()
      setPrevLocation()
    }
  }, [])

  useEffect(() => {
    setSearchFocus()
  }, [searchRef])

  useEffect(() => {
    setCurrentCity()
  }, [location])

  useEffect(() => {
    initializeMap()
  }, [loaded, map, location, city, mapRef, searchRef])

  useEffect(() => {
    addMarkerEvent()
  }, [marker])

  return (
    <Grid fluid>
      {loading && <Loader backdrop center content='loading' size='md' />}
      <Row gutter={16}>
        <Col xs={8}>
          <TextInput id='search_location' ref={searchRef} />
        </Col>
        <Col xs={8}>
          <TextInput id='city' value={city ?? ''} onChange={setCity} />
        </Col>
        <Col xs={4}>
          <Button block appearance='primary' onClick={handleSaveLocation}>
            Guardar
          </Button>
        </Col>
        <Col xs={4}>
          <Button block onClick={onClose}>
            Cancelar
          </Button>
        </Col>
        <Col xs={24} className='mt-16'>
          <div
            ref={mapRef}
            className='map-wrapper'
            style={{ minHeight: '32rem' }}
          />
        </Col>
      </Row>
    </Grid>
  )
}

GoogleLocationsNew.propTypes = {
  onClose: PropTypes.func.isRequired
}