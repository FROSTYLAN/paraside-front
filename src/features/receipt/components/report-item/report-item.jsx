import conversation from '@/assets/photos/conversation.svg';
import styles from './report-item.module.scss';

export const ReportItem = ({ isOpen, onClick, report }) => {
    
  return (
    <>
      <li className={styles.textContainer} onClick={onClick}>
        { `${report?.from_user_nickname.charAt(0).toUpperCase()}${report?.from_user_nickname.slice(1)} `}
        ha reportado el perfil de 
        { ` ${report?.to_user_nickname.charAt(0).toUpperCase()}${report?.to_user_nickname.slice(1)}`}
      </li>
      <section className={`${styles.contentContainer} ${isOpen ? styles.open : ''}`}>
        <p>Motivo</p>
        <article className={styles.reasonContainer}>
          <textarea
            name=""
            cols="30"
            rows="4"
            value={report?.description}
            disabled
          ></textarea>
          <img src={conversation} alt="" />
        </article>
      </section>
    </>
  );
};
