import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchAthletesBySportAsync } from '../../store/analiticsSlice';
import Pagination from '../Pagination/Pagination';
import CONSTANTS from '../../constants';
import Spinner from "../Spinner/Spinner";
import styles from './analitic.module.scss';

const AthletesBySport = () => {
    const dispatch = useDispatch();
    const { athletesBySport, isLoading, error } = useSelector((state) => state.analitics);
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState(CONSTANTS.ORDER_AMOUNT[0]);
    const totalPages = Math.max(1, Math.ceil(athletesBySport.length / amount));
    const currentPage = Math.min(page, totalPages);
    const visibleSports = athletesBySport.slice((currentPage - 1) * amount, currentPage * amount);

    useEffect(() => {
        dispatch(fetchAthletesBySportAsync());
    }, [dispatch]);

    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [page, currentPage]);

    return (
        <section className={styles.analitic}>
            <h2>Amount athletes in each sport</h2>
            {isLoading && <Spinner />}
            {error && <p>{error}</p>}
            {athletesBySport.length === 0 ? (
                <p>Empty data</p>
            ) : (
                    <>
                        <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={visibleSports} margin={{ bottom: 24 }}>
                            <XAxis dataKey="sport" angle={-30} textAnchor="end" interval={0} height={55} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill='darkblue'/>
                        </BarChart>
                    </ResponsiveContainer>
                        {totalPages > 1 && (
                            <Pagination
                                page={currentPage}
                                setPage={setPage}
                                total={athletesBySport.length}
                                amount={amount}
                                setAmount={setAmount}
                            />
                        )}
                    </>
            )}
        </section>
    );
};

export default AthletesBySport;