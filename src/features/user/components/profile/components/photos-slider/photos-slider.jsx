import React, { useEffect, useState } from 'react'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import { Carousel, Modal } from 'rsuite'
import { saveUserRating } from '@/api/user-rating'
import ImageGallery from 'react-image-gallery'
import PropTypes from 'prop-types'

import styles from './photos-slider.module.scss'

// const IMAGES = [
//   'https://api.dicebear.com/5.x/avataaars/svg?seed=A&backgroundColor=ffdfbf',
//   'https://api.dicebear.com/5.x/avataaars/svg?seed=B&backgroundColor=ff2fbf',
//   'https://api.dicebear.com/5.x/avataaars/svg?seed=C&backgroundColor=ffdf6f',
//   'https://api.dicebear.com/5.x/avataaars/svg?seed=D&backgroundColor=ffdfb0',
//   'https://api.dicebear.com/5.x/avataaars/svg?seed=E&backgroundColor=f44fbf'
// ]

const IMAGES = [
  {
    original:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=A&backgroundColor=ffdfbf',
    thumbnail:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=A&backgroundColor=ffdfbf&scale=50'
  },
  {
    original:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=B&backgroundColor=ff2fbf',
    thumbnail:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=B&backgroundColor=ff2fbf&scale=50'
  },
  {
    original:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=C&backgroundColor=ffdf6f',
    thumbnail:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=C&backgroundColor=ffdf6f&scale=50'
  },
  {
    original:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=D&backgroundColor=ffdfb0',
    thumbnail:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=D&backgroundColor=ffdfb0&scale=50'
  },
  {
    original:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=E&backgroundColor=f44fbf',
    thumbnail:
      'https://api.dicebear.com/5.x/avataaars/svg?seed=E&backgroundColor=f44fbf&scale=50'
  }
]

export const PhotosSlider = ({ userId, rating, refetch }) => {
  const [isHeartActive, setIsHeartActive] = useState(rating > 0)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    setIsHeartActive(rating > 0)
  }, [rating])

  const handleHeartToogle = async (isHeartActiveAux) => {
    setIsHeartActive(!isHeartActiveAux)
    const response = await saveUserRating({
      rating: isHeartActiveAux ? 0 : 1,
      user_id: Number(userId),
      description: 'rating'
    })
    refetch && refetch()
    console.log(response)
  }

  const [activeIndex, setActiveIndex] = React.useState(2)
  return (
    <div style={{ position: 'relative' }}>
      <div
        className={styles.heart}
        onClick={() => handleHeartToogle(isHeartActive)}
      >
        {isHeartActive ? <BsSuitHeartFill /> : <BsSuitHeart />}
      </div>
      <Carousel
        className='custom-slider'
        activeIndex={activeIndex}
        onSelect={(index) => {
          setActiveIndex(index)
        }}
        style={{ backgroundColor: 'transparent', height: 'unset' }}
      >
        {IMAGES.map((image, index) => (
          <img
            key={index}
            src={image.original}
            style={{ borderRadius: '1.6rem', backgroundColor: 'transparent' }}
            alt='profile_image'
            onClick={() => setShowGallery(true)}
          />
        ))}
      </Carousel>
      <Modal open={showGallery} onClose={() => setShowGallery(false)} size='sm'>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
          <ImageGallery items={IMAGES} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

PhotosSlider.propTypes = {
  userId: PropTypes.string.isRequired,
  rating: PropTypes.number,
  refetch: PropTypes.func
}
