import { Route, HashRouter as Router, Routes } from "react-router-dom";

import styles from "./App.module.css";
import Home from "./pages/Home/Home";
import Match from "./pages/Match/Match";
import MatchSettings from "./pages/MatchSettings/MatchSettings";
import Practice from "./pages/Practice/Practice";
import PracticeSettings from "./pages/PracticeSettings/PracticeSettings";
import Statistics from "./pages/Statistics/Statistics";

const App = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<Match />} />
          <Route path="/match-settings" element={<MatchSettings />} />
          <Route path="/practice-settings" element={<PracticeSettings />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
