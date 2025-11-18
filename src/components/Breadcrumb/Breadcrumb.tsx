import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  // Split the path into parts: /dashboard/users/profile => ["dashboard", "users", "profile"]
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav
      aria-label="breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: '14px',
        marginBottom: '1rem',
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500, fontSize: '16px' }}
      >
        Dashboard
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={name} style={{ display: 'flex', alignItems: 'center' }}>
            <NavigateNextIcon style={{ fontSize: '18px', color: '#999', margin: '0 4px' }} />
            {isLast ? (
              <span style={{ color: '#555', textTransform: 'capitalize' }}>
                {name.split('-').join(' ')}
              </span>
            ) : (
              <Link
                to={routeTo}
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  textTransform: 'capitalize',
                }}
              >
                {name.split('-').join(' ')}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
