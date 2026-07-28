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
import { APPLICANT_PROFILES } from './data/sampleDataset.js';

export default function App() {
  const [userSession, setUserSession] = useState(null);
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicants, setApplicants] = useState(APPLICANT_PROFILES);

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
    setApplicants([newApplicant, ...applicants]);
    setSelectedApplicant(newApplicant);
    setActiveTab('REPORT_VIEW');
  };

  const handleUpdateApplicantStatus = (applicantId, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status: newStatus } : app))
    );
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  if (!userSession) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (userSession.role === 'SUPER_ADMIN') {
    return <SuperAdminDashboard onSignOut={handleSignOut} />;
  }

  if (userSession.role === 'BANK_ADMIN') {
    return <BankAdminDashboard bankUser={userSession} onSignOut={handleSignOut} />;
  }

  return (
    <div className="main-layout">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNewAnalysis={() => setActiveTab('NEW_ANALYSIS')}
        onSignOut={handleSignOut}
      />

      <div style={{ flex: 1, backgroundColor: '#070913', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {(activeTab === 'DASHBOARD' || activeTab === 'QUEUE') && (
          <AgentDashboard
            applicants={applicants}
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
            onUpdateApplicantStatus={handleUpdateApplicantStatus}
          />
        )}

        {activeTab === 'RISK_MODELS' && <RiskModelsView />}

        {activeTab === 'AUDIT' && <AuditTrailView />}

        {activeTab === 'REPORTS' && <ReportsView />}
      </div>
    </div>
  );
}
