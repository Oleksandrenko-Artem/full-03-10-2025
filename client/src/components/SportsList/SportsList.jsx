import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSportsAsync } from '../../store/sportsSlice';
import SportItem from './SportItem';
import Spinner from "../Spinner/Spinner";
import Pagination from '../Pagination/Pagination';
import CONSTANTS from '../../constants';
import styles from './sports.module.scss';

const SportsList = () => {
    const dispatch = useDispatch();
    const { sports, error, isLoading } = useSelector((state) => state.sports);
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState(CONSTANTS.ORDER_AMOUNT[0]);
    const totalPages = Math.max(1, Math.ceil(sports.length / amount));
    const currentPage = Math.min(page, totalPages);
    const visibleSports = sports.slice((currentPage - 1) * amount, currentPage * amount);

    useEffect(() => {
        dispatch(fetchAllSportsAsync());
    }, [dispatch]);

    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [page, currentPage]);

    const showSport = (sport) => <SportItem key={sport._id} sport={sport} />
    if (isLoading) {
        return <Spinner />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <section className={styles['list-section']}>
            <h2>Sports List</h2>
            {sports.length > 0 ? (
                <>
                    <ul className={styles.list}>{visibleSports.map(showSport)}</ul>
                    {totalPages > 1 && (
                        <Pagination
                            page={currentPage}
                            setPage={setPage}
                            total={sports.length}
                            amount={amount}
                            setAmount={setAmount}
                        />
                    )}
                </>
            ) : <p>No sports available.</p>}
        </section>
    );
}

export default SportsList;