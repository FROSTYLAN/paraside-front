import { Link } from 'react-router-dom';
import { IconCheckFilled } from '@/assets/icons';
import styles from './user-card.module.scss';
import { FloatingOptions } from '../floating-options/floating-options';
import { useState } from 'react';
import { IconOptions } from '@/assets/icons'
import { ModalReport } from '../modal-report/modal-report';

export const UserCard = ({ user, onImageError, type }) => {
    const requestOption = [
        "Aceptar solicitud",
        "Rechazar solicitud",
    ];

    const contactOption = [
        "Ir a la conversación",
        "Bloquear a este contacto",
        "Reportar a este contacto"
    ];

    const getOptions = (type) => {
        const options = type === 'request' ? requestOption : contactOption;
        return options;
    };

    const [showOptions, setShowOptions] = useState(false);
    const [showModalReport, setShowModalReport] = useState(false);

    const toggleOptions = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        setShowOptions(!showOptions);
    };

    return (
        <Link to={`/plus/user/${user.user_id}?type=${type}`} className={styles.userCard}>
            <img
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${user.name}&backgroundColor=ffdfbf`}
                alt=""
                onError={onImageError}
            />
            <section className={styles.userSummary} onClick={event => event.preventDefault()}>
                <div  onClick={toggleOptions}>
                    {(type === 'request' || type === 'contact') &&
                        <article className={styles.optionsContainer}> 
                            <IconOptions className={styles.iconOptions} />
                            <FloatingOptions
                                options={getOptions(type)}
                                showOptions={showOptions}
                                setShowOptions={setShowOptions}
                                setShowModalReport={setShowModalReport}
                            />
                        </article>
                    }   
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.name}>
                        <p>
                            {user.nickname}, {user.age || 18}
                        </p>
                    </div>
                    <small>a 3Km</small>
                </div>
                <div className='mt-2'>
                    {user && <IconCheckFilled className={styles.verified} />}
                </div>
            </section>
            {showModalReport && 
                <ModalReport 
                    setShowModalReport={setShowModalReport} 
                    user_id={user.user_id}
                />
            }
        </Link>
    );
};
