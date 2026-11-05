import React, { useEffect, useState } from 'react';
import AthleteItem from './AthleteItem';
import Pagination from '../Pagination/Pagination';
import CONSTANTS from '../../constants';
import styles from './athletes.module.scss';

const AthletesList = ({ athletes }) => {
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState(CONSTANTS.ORDER_AMOUNT[0]);
    const totalPages = Math.max(1, Math.ceil(athletes.length / amount));
    const currentPage = Math.min(page, totalPages);
    const visibleAthletes = athletes.slice((currentPage - 1) * amount, currentPage * amount);

    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [page, currentPage]);

    const showAthleteItem = (athlete) => <AthleteItem key={athlete._id} athlete={athlete} />
    return (
        <section className={styles['list-section']}>
            <h2>Athletes</h2>
            {athletes.length === 0 ? (
                <p>Empty list</p>
            ) : (
                <>
                    <ul className={styles.list}>{visibleAthletes.map(showAthleteItem)}</ul>
                    {totalPages > 1 && (
                        <Pagination
                            page={currentPage}
                            setPage={setPage}
                            total={athletes.length}
                            amount={amount}
                            setAmount={setAmount}
                        />
                    )}
                </>
            )}
        </section>
    );
}

export default AthletesList;