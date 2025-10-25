import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu/Menu';
import Match from './pages/Match/Match';
import Statistics from './pages/Statistics/Statistics';
import styles from './App.module.css';
const App = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/match" element={<Match />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
