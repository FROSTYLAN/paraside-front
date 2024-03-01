import photoExample from '@/assets/photos/pose1.webp';
import styles from './requests-list.module.scss';
import { Link } from 'react-router-dom';
import { Loader } from 'rsuite';
import { useGetUserOverFiveReports } from '@/api/user-report';

export const RequestsList = ({ type }) => {

  const redirectPanel = (type, id) => {
    const typeToPathMap = {
      report: "/admin/receipt/report",
      photo: "/admin/receipt/verification-photo",
      id: "/admin/receipt/verification-id",
      default: "/admin/receipt"
    };

    const path = typeToPathMap[type] || typeToPathMap.default;
    return id ? `${path}/${id}` : path;
  };

  return (
    <div>
      <section className={styles.headerContainer}>
        <h1>LISTADO DE SOLICITUDES</h1>
      </section>
      <section className={styles.listContainer}>
        {type === 'report' ? (
          <ReportSection redirectPanel={redirectPanel}  />
        ) : (
          <NonReportSection type={type} redirectPanel={redirectPanel}/>
        )}
      </section>
    </div>
  );
};

const ReportSection = ({ redirectPanel }) => {
  const { data: usersReported, isLoading: isLoadingUserReported } = useGetUserOverFiveReports({});
  
  return (
    <>
      {isLoadingUserReported ? (
        <Loader center size="md" />
      ) : (
        usersReported.map((u, i) => (
          <Link key={i} to={redirectPanel('report', u.user_id)}>
            <article className={styles.requestContainer}>
              <img src={photoExample} alt="foto de ejemplo" />
              <p>{`${u.user_reported.charAt(0).toUpperCase()}${u.user_reported.slice(1)} ha sido reportado ${u.number_reports} veces`}</p>
            </article>
          </Link>
        ))
      )}
    </>
  );
};

const NonReportSection = ({ type, redirectPanel }) => {
    
  const messages = {
    photo: 'Lizbet ha enviado una solicitud de verificación por fotografía',
    id: 'Rodrigo ha enviado una solicitud de verificación por ID',
    report: 'Rodrigo ha sido reportado por Yandira'
  };
  // Lógica para otras secciones (photo, id, etc.)
  return (
    <>
      <Link to={redirectPanel(type, 1)}>
        <article className={styles.requestContainer}>
          <img src={photoExample} alt="foto de ejemplo" />
          <p>{messages[type]}</p>
        </article>
      </Link>
      {/* Agregar más secciones según sea necesario */}
    </>
  );
};
