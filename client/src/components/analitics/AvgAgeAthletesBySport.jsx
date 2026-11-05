import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { fetchAvgAgeAthletesBySportAsync } from '../../store/analiticsSlice';
import CONSTANTS from '../../constants';
import Pagination from '../Pagination/Pagination';
import Spinner from "../Spinner/Spinner";
import styles from './analitic.module.scss';

const AvgAgeAthletesBySport = () => {
    const dispatch = useDispatch();
    const { avgAgeAthletesBySport, isLoading, error } = useSelector((state) => state.analitics);
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState(CONSTANTS.ORDER_AMOUNT[0]);
    const totalPages = Math.max(1, Math.ceil(avgAgeAthletesBySport.length / amount));
    const currentPage = Math.min(page, totalPages);
    const visibleSports = avgAgeAthletesBySport.slice((currentPage - 1) * amount, currentPage * amount);

    useEffect(() => {
        dispatch(fetchAvgAgeAthletesBySportAsync());
    }, [dispatch]);

    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [page, currentPage]);

    const showColorCell = (sport, i) => (<Cell key={sport.sport} fill={CONSTANTS.COLORS[i]} />);
    return (
        <section className={styles.analitic}>
            <h2>Average age athletes by sport</h2>
            {isLoading && <Spinner />}
            {error && <p>{error}</p>}
            {avgAgeAthletesBySport.length === 0 ? (
                <p>Empty data</p>
            ) : (
                <>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={visibleSports} margin={{ bottom: 24 }}>
                            <XAxis dataKey="sport" angle={-30} textAnchor="end" interval={0} height={55} />
                            <YAxis />
                            <Tooltip/>
                            <Bar dataKey="avgAge">{visibleSports.map(showColorCell)}</Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    {totalPages > 1 && (
                        <Pagination
                            page={currentPage}
                            setPage={setPage}
                            total={avgAgeAthletesBySport.length}
                            amount={amount}
                            setAmount={setAmount}
                        />
                    )}
                </>
            )}
        </section>
    );
}

export default AvgAgeAthletesBySport;