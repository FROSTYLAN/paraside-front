import React from 'react'
import { Button, Divider, FlexboxGrid, Loader } from 'rsuite'
import clsx from 'clsx'

import styles from './pricing.module.scss'
import { usePricing } from '@/api/pricing'
import { useNavigate } from 'react-router-dom'

export const Pricing = () => {
  const { isLoading, data: prices } = usePricing()
  const navigate = useNavigate()

  return (
    <FlexboxGrid
      justify='center'
      style={{ height: 'calc(100vh - 20rem', alignItems: 'center' }}
    >
      <FlexboxGrid.Item>
        <h1>Elige alguno de nuestros planes</h1>
        <Divider className='mt-32 mb-32' />
        {isLoading && (
          <Loader center size='md' content='Cargando...' className='mt-32' />
        )}
        <div className={styles.cards}>
          {prices?.map((price, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardContent}>
                <h3>{price.description?.toUpperCase()}</h3>
                <Divider className='mt-8 mb-16' />
                <p>Suscribirse al {price.description} de Paradise Plus</p>
                <div className={styles.cardPrice}>
                  <span>{price.currency?.symbol}</span>
                  <span>{price.price}</span>
                </div>
                {/* <p className={clsx(styles.cardFooter, 'mb-16')}>
                  {price.footer}
                </p> */}
                <Button
                  appearance='primary'
                  block
                  className={styles.cardButton}
                  onClick={() =>
                    navigate('/plus/checkout', { state: { price } })
                  }
                >
                  ¡LO QUIERO!
                </Button>
              </div>
              {/* {price.save && (
                <div className={styles.cardSave}>
                  <span>{price.save}</span>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
