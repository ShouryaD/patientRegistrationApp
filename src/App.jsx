import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { initDb, resetDb } from './db/Index.js'
import useBroadcastChannel from './multiTabSync/Brodcast.jsx'
import Load from './components/Load.jsx'
import PatientRegistration from './components/PatientRegistration.jsx'
import Table from './components/Table.jsx'

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // Initialize database on first render
  useEffect(() => {
    async function start() {
      await initDb()
        .then(() => setReady(true))
        .catch(err => {
          setError(err);
          setReady(true);
        });
    }
    start()
  }, []);

  // BroadcastChannel 
  const post = useBroadcastChannel("patients-db-sync", (event) => {
    if (event.data === "refresh") {
      resetDb(); // Reset DB instance to force reload from IndexedDB
      setRefresh(r => r + 1); // Trigger UI update
    }
  });

  if (!ready) return <Load />;

  if (error) {
    return (
      <div style={{ color: "red", padding: 16 }}>
        <h2>Database Initialization Error</h2>
        <pre>{error && (error.stack || JSON.stringify(error, null, 2) || String(error))}</pre>
        <p>Check browser console for more details.</p>
      </div>
    );
  }

  // Fn to refresh data and broadcast to other open tabs
  const handleDbChange = () => {
    setRefresh(r => r + 1); // Local refresh
    post("refresh");        // Send to other tabs
  };


  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/' element={<PatientRegistration onRegister={handleDbChange} />} />
        <Route path='/patient-list' element={<Table refresh={refresh} onDbChange={handleDbChange} />} />
      </Routes>
    </BrowserRouter>
  )
}
