import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SelectNetwork from './pages/SelectNetwork';
import RecoveryPhraseWarning from './pages/RecoveryPhraseWarning';
import SecretRecoveryPhrase from './pages/SecretRecoveryPhrase';
import BalancePage from './pages/BalancePage';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/select-network" element={<SelectNetwork />} />
        <Route path="/recovery-phrase-warning" element={<RecoveryPhraseWarning />} />
        <Route path="/secret-recovery-phrase" element={<SecretRecoveryPhrase />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
