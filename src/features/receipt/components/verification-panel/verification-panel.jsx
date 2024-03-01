import verificationPhoto1 from '@/assets/photos/verification-photo1.svg'
import verificationPhoto2 from '@/assets/photos/verification-photo2.svg'
import verificationId1 from '@/assets/photos/verification-id1.svg'
import verificationId2 from '@/assets/photos/verification-id2.svg'

import iconChecked from '@/assets/icons/icon_checked.svg'
import iconCancel from '@/assets/icons/icon_cancel.svg'

import styles from './verification-panel.module.scss'

export const VerificationPanel = ({ type }) => {
    return (
        <div>
            <section className={styles.headerContainer}>
                <h1>SOLICITUD N° 0000001</h1>
            </section>
            <section className={styles.contentContainer}>
                <article className={styles.imagesContainer}>
                    <section>
                        <p>Fotos de perfil</p>
                        {type === 'photo' && <img src={verificationPhoto1} alt="foto de ejemplo 1" />}
                        {type === 'id' && <img src={verificationId1} alt="foto de ejemplo 1" />}
                    </section>
                    <div></div>
                    <section>
                        <p>
                            Fotos de verificación
                        </p>
                        {type === 'photo' && <img src={verificationPhoto2} alt="foto de ejemplo 1" />}
                        {type === 'id' && <img src={verificationId2} alt="foto de ejemplo 1" />}
                    </section>
                </article>
                <article className={styles.buttonsContainer}>
                    <button>
                        <img src={iconChecked} alt="Aprobar"/>
                        <p>APROBAR</p>
                    </button>
                    <button>
                        <img src={iconCancel} alt="Rechazar" />
                        <p>RECHAZAR</p>
                    </button>
                </article>
            </section>
        </div>
    )
}