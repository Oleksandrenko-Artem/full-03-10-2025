import React from 'react';
import { Icon } from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import styles from './Pagination.module.scss';
import CONSTANTS from '../../constants';

const Pagination = (props) => {
    const { page, setPage, total, amount, setAmount } = props;
    const totalPages = Math.max(1, Math.ceil(total / amount));

    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };
    const handleNext = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    const showOption = (option) => <option key={option} value={option}>{option}</option>;
    const handleChange = (event) => {
        setAmount(Number(event.target.value));
        setPage(1);
    };
    return (
        <div className={styles.wrapper}>
            <button type="button" onClick={handlePrev} className={styles.arrow} disabled={page <= 1} aria-label="Previous page">
                <Icon size={1.25} path={mdiChevronLeft} />
            </button>
            <span className={styles.page} aria-live="polite">{page} / {totalPages}</span>
            <button type="button" onClick={handleNext} className={styles.arrow} disabled={page >= totalPages} aria-label="Next page">
                <Icon size={1.25} path={mdiChevronRight} />
            </button>
            <div className={styles['select-amount']}>
                <span className={styles.amount}>Amount</span>
                <select aria-label="Items per page" value={amount} onChange={handleChange}>
                    {
                        CONSTANTS.ORDER_AMOUNT.map(showOption)
                    }
                </select>
            </div>
        </div>
    );
};

export default Pagination;