import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen.jsx';
import SuperAdminDashboard from './components/SuperAdminDashboard.jsx';
import BankAdminDashboard from './components/BankAdminDashboard.jsx';
import Sidebar from './components/Sidebar.jsx';
import AgentDashboard from './components/AgentDashboard.jsx';
import NewAnalysis from './components/NewAnalysis.jsx';
import UnderwritingReportView from './components/UnderwritingReportView.jsx';
import RiskModelsView from './components/RiskModelsView.jsx';
import AuditTrailView from './components/AuditTrailView.jsx';
import ReportsView from './components/ReportsView.jsx';

export default function App() {
  const [userSession, setUserSession] = useState(null); // null or { role, employeeId, bankName, branch }
  const [activeTab, setActiveTab] = useState('DASHBOARD'); // 'DASHBOARD', 'QUEUE', 'NEW_ANALYSIS', 'REPORT_VIEW'
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleLoginSuccess = (sessionData) => {
    setUserSession(sessionData);
    setActiveTab('DASHBOARD');
  };

  const handleSignOut = () => {
    setUserSession(null);
    setSelectedApplicant(null);
  };

  const handleSelectApplicant = (applicant) => {
    setSelectedApplicant(applicant);
    setActiveTab('REPORT_VIEW');
  };

  const handleAnalysisComplete = (newApplicant) => {
    setSelectedApplicant(newApplicant);
    setActiveTab('REPORT_VIEW');
  };

  // 1. If not logged in, go STRAIGHT TO LOGIN SCREEN
  if (!userSession) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // 👑 TIER 1: SUPER ADMIN (PRODUCT OWNER)
  if (userSession.role === 'SUPER_ADMIN') {
    return <SuperAdminDashboard onSignOut={handleSignOut} />;
  }

  // 🏛️ TIER 2: BANK INSTITUTION ADMIN
  if (userSession.role === 'BANK_ADMIN') {
    return <BankAdminDashboard bankUser={userSession} onSignOut={handleSignOut} />;
  }

  // 👤 TIER 3: BANK EMPLOYEE / CREDIT OFFICER (DAILY END USER)
  return (
    <div className="main-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNewAnalysis={() => setActiveTab('NEW_ANALYSIS')}
        onSignOut={handleSignOut}
      />

      {/* Main Workspace Area */}
      <div style={{ flex: 1, backgroundColor: '#070913', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {(activeTab === 'DASHBOARD' || activeTab === 'QUEUE') && (
          <AgentDashboard
            onSelectApplicant={handleSelectApplicant}
            onNewAnalysis={() => setActiveTab('NEW_ANALYSIS')}
          />
        )}

        {activeTab === 'NEW_ANALYSIS' && (
          <NewAnalysis onAnalysisComplete={handleAnalysisComplete} />
        )}

        {activeTab === 'REPORT_VIEW' && selectedApplicant && (
          <UnderwritingReportView
            applicant={selectedApplicant}
            onBack={() => setActiveTab('DASHBOARD')}
          />
        )}

        {activeTab === 'RISK_MODELS' && <RiskModelsView />}

        {activeTab === 'AUDIT' && <AuditTrailView />}

        {activeTab === 'REPORTS' && <ReportsView />}
      </div>
    </div>
  );
}
