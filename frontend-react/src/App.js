// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import DataUpload from './pages/DataUpload';
import Detection from './pages/Detection';
import Reports from './pages/Reports';
import Detection2 from './pages/Detection2';
import Reports2 from './pages/Reports2';
import Layout from './components/Layout';
import Dataset from './pages/DataSet';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="/data-upload" element={<DataUpload />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/detection" element={<Detection2  />} />
          <Route path="/reports" element={<Reports2  />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
