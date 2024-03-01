import styles from './report-panel.module.scss';
import photoExample from '@/assets/photos/pose1.webp';
import { IconCancel, IconDanger } from '@/assets/icons';
import { ReportItem } from '../report-item/report-item';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetReportsByUser } from '@/api/user-report';

export const ReportPanel = () => {
  const { id } = useParams();
  const { data: reports, isLoading: isLoadingReports } = useGetReportsByUser({ id });

  const [reportItemsState, setReportItemsState] = useState(Array(reports?.length).fill(false));

  const handleReportItemClick = (index) => {
    const newReportItemsState = Array(reports?.length).fill(false);
    if (reportItemsState[index] === false) {
      newReportItemsState[index] = true;
    }
    setReportItemsState(newReportItemsState);
  };

  return (
    <div>
      <section className={styles.headerContainer}>
        <h1>REPORTES DE PERFIL</h1>
      </section>
      <section className={styles.contentContainer}>
        <article className={styles.requestContainer}>
          <img src={photoExample} alt="foto de ejemplo" />
          <p>{`Rodrigo tiene ${reports?.length} reportes de perfil`}</p>
        </article>
        <ul>
          {reports?.map((report, i) => (
            <ReportItem
              key={i}
              isOpen={reportItemsState[i]}
              onClick={() => handleReportItemClick(i)}
              report={report}
            />
          ))}
        </ul>
      </section>
      <section className={styles.buttonsContainer}>
        <button>
            <IconDanger />
            <p>ADVERTIR USUARIO</p>
        </button>
        <button>
            <IconCancel />
          <p>ELIMINAR USUARIO</p>
        </button>
      </section>
    </div>
  );
};
