import React, { useState } from 'react';
import { ModalReport } from '../modal-report/modal-report';
import styles from './floating-options.module.scss';

export const FloatingOptions = ({ options, showOptions, setShowOptions, setShowModalReport }) => {

  const stopPropagation = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const handleAction = (option) => {
    if (option === 'Reportar a este contacto') {
      setShowModalReport(true);
      setShowOptions(false);
    }
  }

  return (
    <div
      className={`${styles.container} ${showOptions ? styles.active : styles.inactive}`}
      onClick={stopPropagation}
    >
      {
        options.map((option, i) => (
          <p key={i} className={styles.options} onClick={() => handleAction(option)}>{option}</p>
        ))
      }
    </div>
  );
}
