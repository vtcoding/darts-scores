import type { StatRow } from "../../types";
import styles from "./StatsTable.module.css";

interface StatsTableProps {
    rows: StatRow[];
}

const StatsTable = ({ rows }: StatsTableProps) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.tr}>
                    <th className={styles.th}></th>
                    <th className={styles.th}>Avg</th>
                    <th className={styles.th}>Best</th>
                    <th className={styles.th}>Worst</th>
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row: StatRow, index: number) => {
                        return (
                            <tr key={index} className={styles.tr}>
                                <td className={styles.td}>{row.name}</td>
                                <td className={styles.td}>{row.average.value}{row.average.unit}</td>
                                <td className={styles.td}>{row.best.value}{row.best.unit}</td>
                                <td className={styles.td}>{row.worst.value}{row.worst.unit}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>);
}

export default StatsTable;