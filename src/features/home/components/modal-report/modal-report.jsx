import { useState } from 'react';
import styles from './modal-report.module.scss';
import { saveUserReport } from '@/api/user-report';

export const ModalReport = ({ setShowModalReport, user_id }) => {
  const [description, setDescription] = useState('');

  const stopPropagation = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleTextareaChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClick = (event) => {
    if (event.target.classList.contains(styles.modal)) {
      setShowModalReport(false);
    }
    stopPropagation(event);
  };

  const handleReport = async () => {
    const response = await saveUserReport({
      user_id: user_id,
      description: description
    });
    console.log(response);
    setShowModalReport(false);
  };

  return (
    <div className={styles.modal} onClick={handleClick}>
      <div className={styles.modalContainer}>
        <p className={styles.title}>¿Por qué quieres reportar este usuario?</p>
        <textarea
          className={styles.message}
          value={description}
          onChange={handleTextareaChange}
          cols="30"
          rows="5"
          placeholder="Escribe aquí tu mensaje..."
        ></textarea>
        <p className={styles.description}>
          Recuerda que puedes adjuntar evidencia para hacer más efectiva tu solicitud de Reportar este usuario.
        </p>
        <section className={styles.buttonsContainer}>
          <button>Adjuntar evidencia</button>
          <button onClick={handleReport}>Reportar</button>
        </section>
      </div>
    </div>
  );
};
