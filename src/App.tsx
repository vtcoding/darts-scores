import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Match from './pages/Match/Match';
import Statistics from './pages/Statistics/Statistics';
import styles from './App.module.css';
const App = () => {
  return (
    <div className={styles.app}>
      <Router basename={import.meta.env.DEV ? "/" : "/darts-scores"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<Match />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
