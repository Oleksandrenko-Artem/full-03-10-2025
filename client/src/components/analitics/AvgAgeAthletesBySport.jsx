import React, { useEffect } from 'react';
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
import styles from './analitic.module.scss';

const AvgAgeAthletesBySport = () => {
    const dispatch = useDispatch();
    const { avgAgeAthletesBySport, isLoading, error } = useSelector((state) => state.analitics);
    useEffect(() => {
        dispatch(fetchAvgAgeAthletesBySportAsync());
    }, [dispatch]);
    const showColorCell = (sport, i) => (<Cell key={sport.sport} fill={CONSTANTS.COLORS[i]} />);
    return (
        <section className={styles.analitic}>
            <h2>Average age athletes by sport</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {avgAgeAthletesBySport.length === 0 ? (
                <p>Empty data</p>
            ) : (
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={avgAgeAthletesBySport}>
                            <XAxis dataKey="sport"/>
                            <YAxis />
                            <Tooltip/>
                            <Bar dataKey="avgAge">{avgAgeAthletesBySport.map(showColorCell)}</Bar>
                        </BarChart>
                    </ResponsiveContainer>
            )}
        </section>
    );
}

export default AvgAgeAthletesBySport;