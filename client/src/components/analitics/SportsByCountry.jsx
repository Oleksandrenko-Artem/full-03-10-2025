import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";
import { fetchSportsByCountryAsync } from '../../store/analiticsSlice';
import CONSTANTS from '../../constants';
import styles from './analitic.module.scss';

const SportsByCountry = () => {
    const dispatch = useDispatch();
    const { sportsByCountry, isLoading, error } = useSelector((state) => state.analitics);
    useEffect(() => {
        dispatch(fetchSportsByCountryAsync());
    }, [dispatch]);
    const showColorCell = (country, i) => (<Cell key={country.country} fill={CONSTANTS.COLORS_SECOND[i]} />);
    return (
        <section className={styles.analitic}>
            <h2>Amount sports in each country</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {sportsByCountry.length === 0 ? (
                <p>Empty data</p>
            ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart width={300} height={300}>
                            <Pie data={sportsByCountry} dataKey="amount" nameKey="country" label legendType='circle' >{sportsByCountry.map(showColorCell)}</Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
            )}
        </section>
    );
}

export default SportsByCountry;