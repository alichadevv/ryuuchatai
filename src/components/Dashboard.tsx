import React, { useState, useEffect } from 'react';
import { User } from '../types';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import MainContent from './dashboard/MainContent';
import ChatInterface from './dashboard/ChatInterface';
import MessageDeveloper from './dashboard/MessageDeveloper';
import Content from './dashboard/Content';
import Rating from './dashboard/Rating';
import ChatAI from './dashboard/ChatAI';
import Settings from './dashboard/Settings';
import TouchAnimation from './dashboard/TouchAnimation';
import ContactsManager from './dashboard/ContactsManager';
import StatusManager from './dashboard/StatusManager';
import AdminPanel from './AdminPanel';
import WarningModal from './WarningModal';
import BannedScreen from './BannedScreen';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([user]);
  const [currentWarning, setCurrentWarning] = useState<any>(null);

  // Check if user is banned
  if (user.isBanned) {
    return <BannedScreen user={user} />;
  }

  // Check for warnings
  useEffect(() => {
    const checkWarnings = () => {
      if (user.warnings && user.warnings.length > 0) {
        const unacknowledgedWarning = user.warnings.find(w => !w.acknowledged);
        if (unacknowledgedWarning) {
          setCurrentWarning(unacknowledgedWarning);
        }
      }
    };

    checkWarnings();
  }, [user]);

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const handleSendWarning = (userId: string, message: string) => {
    const warning = {
      id: Date.now().toString(),
      message,
      sentBy: user.username,
      sentAt: new Date(),
      acknowledged: false
    };

    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, warnings: [...(u.warnings || []), warning] }
        : u
    ));
  };

  const handleUpdateSettings = (settings: any) => {
    // Update site settings
    console.log('Settings updated:', settings);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="https://files.catbox.moe/0zrf92.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header 
            user={user}
            onMenuClick={() => setSidebarOpen(true)}
            onLogout={onLogout}
          />

          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
            {activeSection === 'home' && (
              <MainContent user={user} onSectionChange={setActiveSection} />
            )}
            {activeSection === 'chat' && (
              <ChatInterface user={user} />
            )}
            {activeSection === 'contacts' && (
              <ContactsManager user={user} />
            )}
            {activeSection === 'status' && (
              <StatusManager user={user} />
            )}
            {activeSection === 'message-developer' && (
              <MessageDeveloper />
            )}
            {activeSection === 'content' && (
              <Content />
            )}
            {activeSection === 'rating' && (
              <Rating />
            )}
            {activeSection === 'chat-ai' && (
              <ChatAI />
            )}
            {activeSection === 'settings' && (
              <Settings user={user} />
            )}
            {activeSection === 'admin' && user.isSuperAdmin && (
              <AdminPanel 
                currentUser={user}
                users={users}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
                onSendWarning={handleSendWarning}
                onUpdateSettings={handleUpdateSettings}
              />
            )}
            </div>
          </main>
        </div>
      </div>

      {/* Touch Animation */}
      <TouchAnimation />

      {/* Warning Modal */}
      {currentWarning && (
        <WarningModal 
          warning={currentWarning}
          onClose={() => setCurrentWarning(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;