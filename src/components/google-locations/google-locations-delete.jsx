import React from 'react'
import { useUser } from '@/hooks/use-user'
import { useGetUserLocations, useDeleteUserLocation } from '@/api/user-location'
import { Button, FlexboxGrid, List, Loader } from 'rsuite'
import { FaTrashAlt } from 'react-icons/fa'

export const GoogleLocationsDelete = () => {
  const { user } = useUser()
  const { isLoading: isLoadingLocations, data: userLocations } =
    useGetUserLocations({
      id: user.id
    })

  const mutationDelete = useDeleteUserLocation(
    (oldData, id) => oldData.filter((item) => item.id !== id),
    `/${user.id}`
  )

  const onDelete = async (id) => {
    try {
      await mutationDelete.mutateAsync(id)
    } catch (e) {
      console.error('Error deleting location', e)
    }
  }

  console.log('userLocations', userLocations)
  return isLoadingLocations ? (
    <Loader center size='lg' content='Loading' />
  ) : (
    <List hover>
      {userLocations?.map((location, index) => (
        <List.Item key={location.value} index={index + 1}>
          <FlexboxGrid
            justify='space-between'
            align='middle'
            style={{ padding: '0 0.8rem' }}
          >
            <FlexboxGrid.Item>
              <span>{location.label}</span>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Button
                onClick={() => onDelete(location.id)}
                size='sm'
                style={{
                  fontSize: '1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--color-danger)'
                }}
              >
                <FaTrashAlt />
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  )
}
