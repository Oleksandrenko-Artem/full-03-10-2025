import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";
import { fetchAthletesByCountryAsync } from '../../store/analiticsSlice';
import CONSTANTS from '../../constants';
import styles from './analitic.module.scss';

const AthletesByCountry = () => {
    const dispatch = useDispatch();
    const { athletesByCountry, isLoading, error } = useSelector((state) => state.analitics);
    useEffect(() => {
        dispatch(fetchAthletesByCountryAsync());
    }, [dispatch]);
    const showColorCell = (country, i) => (<Cell key={country.country} fill={CONSTANTS.COLORS[i]} />);
    return (
        <section className={styles.analitic}>
            <h2>Amount athletes in each country</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {athletesByCountry.length === 0 ? (
                <p>Empty data</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={300} height={300}>
                        <Pie data={athletesByCountry} dataKey="amount" nameKey="country" label legendType='circle'>
                            {athletesByCountry.map(showColorCell)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </section>
    );
};

export default AthletesByCountry;