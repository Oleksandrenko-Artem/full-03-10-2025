import React from 'react';
import { Icon } from '@mdi/react';
import { mdiHelpCircle } from '@mdi/js';
import styles from './pages.module.scss';

const NotFoundPage = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Icon path={mdiHelpCircle} size={3} color="white" />
          <h1>Error 404: Page not found</h1>
        </div>
      </div>
    );
}

export default NotFoundPage;