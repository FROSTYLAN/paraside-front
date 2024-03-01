import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Animation, Button, Divider, RangeSlider, Slider } from 'rsuite'
import { Text, GoogleLocationSelect, FormField } from '@/components/elements'

import { useUser } from '@/hooks/use-user'
import { useGender } from '@/api/gender'
import { useForm } from 'react-hook-form'
import { useGetUserProfilesByFilter } from '@/api/user-profile'
import { useGetUserLocations } from '@/api/user-location'

import {
  useGetUserPreferences,
  useSaveUserPreferences
} from '@/api/user-preferences'
import { LOOKING_FOR_OPTIONS } from '@/utils/constants/globals'

import styles from './filters.module.scss'
import './filters.less'

const DISTANCE_RANGE_LABELS = [
  { value: 0, text: 'Toda la ciudad' },
  { value: 2, text: '2 km' },
  { value: 5, text: '5 km' },
  { value: 10, text: '10 km' },
  { value: 30, text: '30 km' },
  { value: 60, text: '60 km' },
  { value: 100, text: '100 km' },
  { value: 150, text: '150 km' },
  { value: 300, text: '300 km' },
  { value: 999, text: 'Todo el pais' }
]

export const Filters = ({ setShowFilters, showFilters }) => {
  const [distance, setDistance] = useState(5)
  const [ageRange, setAgeRange] = useState([18, 25])
  const { user } = useUser()
  const { data: filters } = useGetUserPreferences({ id: user.id })
  const { data: genders } = useGender()
  const { refetch } = useGetUserProfilesByFilter(filters)
  const { isLoading: isLoadingLocations, data: userLocations } =
    useGetUserLocations({
      id: user.id
    })
  const mutationSavePreferences = useSaveUserPreferences(
    (oldData, newData) => ({
      ...oldData,
      ...newData
    }),
    `/${user.id}`
  )
  const { control, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (filters) {
      const {
        max_distance,
        min_age,
        max_age,
        gender_id,
        looking_for,
        location_id
      } = filters
      const newDistance = DISTANCE_RANGE_LABELS.findIndex(
        (x) => x.value === max_distance
      )
      console.log('newDistance', newDistance)
      setDistance(newDistance === -1 ? 5 : newDistance)
      setAgeRange([min_age || 18, max_age || 25])

      reset({
        gender_id,
        looking_for,
        location_id
      })
    }
  }, [filters])

  const applyFilters = async (data) => {
    setShowFilters(false)
    data.user_id = user.id
    data.max_distance = DISTANCE_RANGE_LABELS[distance].value
    data.min_age = ageRange[0]
    data.max_age = ageRange[1]
    console.log('data', data)

    try {
      await mutationSavePreferences.mutateAsync(data)
      refetch()
    } catch (error) {
      console.log('error applyFilters', error)
    }
  }

  return (
    <Animation.Collapse in={showFilters}>
      {(props, ref) => (
        <div {...props} ref={ref}>
          <Divider />
          <form onSubmit={handleSubmit(applyFilters)}>
            <div className={styles.filtersContent}>
              <section className={styles.section}>
                <Text tag='h3' className='mb-8'>
                  Donde
                </Text>
                <FormField
                  type='googleLocationSelect'
                  control={control}
                  name='location_id'
                  className='mb-16'
                  options={userLocations}
                />
                <Text tag='h3'>{DISTANCE_RANGE_LABELS[distance].text}</Text>
                <Slider
                  min={0}
                  max={DISTANCE_RANGE_LABELS.length - 1}
                  value={distance}
                  tooltip={false}
                  progress
                  graduated
                  onChange={setDistance}
                  className='custom-slider'
                  handleStyle={{
                    borderRadius: 10,
                    width: 20,
                    height: 20
                  }}
                />
              </section>
              <Divider vertical style={{ height: 'unset' }} />
              <section className={styles.section}>
                <Text tag='h3' className='mb-8'>
                  Genero
                </Text>
                <FormField
                  type='select'
                  control={control}
                  name='gender_id'
                  className='mb-16'
                  options={genders}
                />
                <Text tag='h3' className='mb-16'>
                  Edad: {ageRange[0]} - {ageRange[1]} anios
                </Text>
                <RangeSlider
                  tooltip={false}
                  min={18}
                  max={65}
                  value={ageRange}
                  onChange={setAgeRange}
                  constraint={([start, end]) => end - start >= 5}
                  className='custom-slider'
                  handleStyle={{
                    borderRadius: 10,
                    width: 20,
                    height: 20
                  }}
                />
              </section>
              <Divider vertical style={{ height: 'unset' }} />
              <section className={styles.section}>
                <Text tag='h3' className='mb-8'>
                  En busca de
                </Text>
                <FormField
                  type='checkGroup'
                  control={control}
                  name='looking_for'
                  options={LOOKING_FOR_OPTIONS}
                />
              </section>
            </div>
            <div className={styles.actions}>
              <Button type='submit' appearance='primary' size='lg'>
                Aplicar
              </Button>
              <Button onClick={() => setShowFilters((prev) => !prev)} size='lg'>
                Cancelar
              </Button>
            </div>
          </form>
          <Divider />
        </div>
      )}
    </Animation.Collapse>
  )
}

Filters.propTypes = {
  showFilters: PropTypes.bool,
  setShowFilters: PropTypes.func
}
