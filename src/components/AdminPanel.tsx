import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Ban, 
  AlertTriangle, 
  Settings, 
  Palette,
  MessageSquare,
  UserCheck,
  UserX,
  Clock,
  Send,
  Eye,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { User, Warning, UnbanRequest, AdminSettings } from '../types';

interface AdminPanelProps {
  currentUser: User;
  users: User[];
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onSendWarning: (userId: string, message: string) => void;
  onUpdateSettings: (settings: AdminSettings) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  users,
  onUpdateUser,
  onDeleteUser,
  onSendWarning,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [unbanRequests, setUnbanRequests] = useState<UnbanRequest[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    theme: 'dark',
    backgroundVideo: 'https://files.catbox.moe/p02695.mp4',
    allowRegistration: true,
    maintenanceMode: false,
    welcomeMessage: 'Welcome to PlankXploit Community!'
  });

  useEffect(() => {
    // Load unban requests from localStorage
    const savedRequests = localStorage.getItem('plankxploit_unban_requests');
    if (savedRequests) {
      setUnbanRequests(JSON.parse(savedRequests));
    }

    // Load admin settings
    const savedSettings = localStorage.getItem('plankxploit_admin_settings');
    if (savedSettings) {
      setAdminSettings(JSON.parse(savedSettings));
    }
  }, []);

  const sendTelegramNotification = async (message: string) => {
    const botToken = '7708391187:AAEfWPNYz6dsdKaBtAIJmoZlTKzP_gwpvZs';
    const chatId = '7607881795';
    
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
    }
  };

  const handleBanUser = (user: User, reason: string) => {
    const updatedUser = {
      ...user,
      isBanned: true,
      banReason: reason,
      bannedAt: new Date(),
      bannedBy: currentUser.username
    };
    
    onUpdateUser(updatedUser);
    
    // Send Telegram notification
    sendTelegramNotification(
      `🚫 <b>User Banned</b>\n` +
      `Username: ${user.username}\n` +
      `Email: ${user.email}\n` +
      `Reason: ${reason}\n` +
      `Banned by: ${currentUser.username}\n` +
      `Time: ${new Date().toLocaleString()}`
    );
  };

  const handleUnbanUser = (user: User) => {
    const updatedUser = {
      ...user,
      isBanned: false,
      banReason: undefined,
      bannedAt: undefined,
      bannedBy: undefined
    };
    
    onUpdateUser(updatedUser);
    
    // Send Telegram notification
    sendTelegramNotification(
      `✅ <b>User Unbanned</b>\n` +
      `Username: ${user.username}\n` +
      `Email: ${user.email}\n` +
      `Unbanned by: ${currentUser.username}\n` +
      `Time: ${new Date().toLocaleString()}`
    );
  };

  const handleMakeAdmin = (user: User) => {
    const updatedUser = { ...user, isAdmin: true };
    onUpdateUser(updatedUser);
    
    sendTelegramNotification(
      `👑 <b>New Admin Appointed</b>\n` +
      `Username: ${user.username}\n` +
      `Email: ${user.email}\n` +
      `Appointed by: ${currentUser.username}\n` +
      `Time: ${new Date().toLocaleString()}`
    );
  };

  const handleSendWarning = () => {
    if (selectedUser && warningMessage.trim()) {
      onSendWarning(selectedUser.id, warningMessage);
      setWarningMessage('');
      setSelectedUser(null);
      
      sendTelegramNotification(
        `⚠️ <b>Warning Sent</b>\n` +
        `To: ${selectedUser.username}\n` +
        `Message: ${warningMessage}\n` +
        `Sent by: ${currentUser.username}\n` +
        `Time: ${new Date().toLocaleString()}`
      );
    }
  };

  const handleUnbanRequest = (request: UnbanRequest, action: 'approve' | 'reject') => {
    const updatedRequests = unbanRequests.map(req => 
      req.id === request.id ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req
    );
    
    setUnbanRequests(updatedRequests);
    localStorage.setItem('plankxploit_unban_requests', JSON.stringify(updatedRequests));
    
    if (action === 'approve') {
      const user = users.find(u => u.id === request.userId);
      if (user) {
        handleUnbanUser(user);
      }
    }
    
    sendTelegramNotification(
      `${action === 'approve' ? '✅' : '❌'} <b>Unban Request ${action === 'approve' ? 'Approved' : 'Rejected'}</b>\n` +
      `Username: ${request.username}\n` +
      `Original Violation: ${request.violation}\n` +
      `Request Message: ${request.message}\n` +
      `Processed by: ${currentUser.username}\n` +
      `Time: ${new Date().toLocaleString()}`
    );
  };

  const handleSettingsUpdate = () => {
    onUpdateSettings(adminSettings);
    localStorage.setItem('plankxploit_admin_settings', JSON.stringify(adminSettings));
    
    sendTelegramNotification(
      `⚙️ <b>Admin Settings Updated</b>\n` +
      `Theme: ${adminSettings.theme}\n` +
      `Registration: ${adminSettings.allowRegistration ? 'Enabled' : 'Disabled'}\n` +
      `Maintenance: ${adminSettings.maintenanceMode ? 'Enabled' : 'Disabled'}\n` +
      `Updated by: ${currentUser.username}\n` +
      `Time: ${new Date().toLocaleString()}`
    );
  };

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'warnings', label: 'Send Warning', icon: AlertTriangle },
    { id: 'unban', label: 'Unban Requests', icon: UserCheck },
    { id: 'settings', label: 'Site Settings', icon: Settings }
  ];

  if (!currentUser.isSuperAdmin) {
    return (
      <div className="p-6 text-center">
        <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-mono font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-red-600 font-mono">Super Admin privileges required</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="bg-black/90 border border-green-500/30 rounded-xl backdrop-blur-sm">
        {/* Header */}
        <div className="p-6 border-b border-green-500/30">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div>
              <h2 className="text-2xl font-mono font-bold text-green-400">Admin Panel</h2>
              <p className="text-green-600 font-mono">Super Admin Controls</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-green-500/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-mono transition-colors ${
                activeTab === tab.id
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-green-600 hover:text-green-400'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          {/* User Management */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 rounded-lg border ${
                      user.isBanned 
                        ? 'bg-red-900/20 border-red-500/30' 
                        : 'bg-black/50 border-green-500/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={user.avatar || "https://files.catbox.moe/hf13r2.png"}
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-green-400 font-mono font-bold">{user.username}</h3>
                        <p className="text-green-600 text-sm">{user.email}</p>
                        {user.isAdmin && (
                          <span className="text-yellow-400 text-xs">Admin</span>
                        )}
                        {user.isBanned && (
                          <span className="text-red-400 text-xs">Banned</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {!user.isBanned ? (
                        <>
                          <button
                            onClick={() => handleBanUser(user, 'Violation of community guidelines')}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-mono"
                          >
                            <Ban className="w-3 h-3 inline mr-1" />
                            Ban
                          </button>
                          {!user.isAdmin && (
                            <button
                              onClick={() => handleMakeAdmin(user)}
                              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded font-mono"
                            >
                              <UserCheck className="w-3 h-3 inline mr-1" />
                              Make Admin
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded font-mono"
                          >
                            <AlertTriangle className="w-3 h-3 inline mr-1" />
                            Warn
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleUnbanUser(user)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded font-mono"
                        >
                          <UserCheck className="w-3 h-3 inline mr-1" />
                          Unban
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded font-mono"
                      >
                        <Trash2 className="w-3 h-3 inline mr-1" />
                        Delete
                      </button>
                    </div>

                    {user.isBanned && user.banReason && (
                      <div className="mt-2 p-2 bg-red-900/30 rounded text-xs">
                        <p className="text-red-400 font-mono">Reason: {user.banReason}</p>
                        <p className="text-red-600">Banned by: {user.bannedBy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Send Warning */}
          {activeTab === 'warnings' && (
            <div className="max-w-2xl mx-auto">
              {selectedUser ? (
                <div className="space-y-4">
                  <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                    <h3 className="text-orange-400 font-mono font-bold mb-2">
                      Send Warning to {selectedUser.username}
                    </h3>
                    <textarea
                      value={warningMessage}
                      onChange={(e) => setWarningMessage(e.target.value)}
                      className="w-full h-32 px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 resize-none"
                      placeholder="Enter warning message..."
                    />
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={handleSendWarning}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-mono rounded-lg"
                      >
                        <Send className="w-4 h-4 inline mr-2" />
                        Send Warning
                      </button>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-mono rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-orange-400 font-mono text-xl mb-2">Select a User</h3>
                  <p className="text-orange-600">Go to User Management to select a user to warn</p>
                </div>
              )}
            </div>
          )}

          {/* Unban Requests */}
          {activeTab === 'unban' && (
            <div className="space-y-4">
              {unbanRequests.filter(req => req.status === 'pending').length === 0 ? (
                <div className="text-center">
                  <UserCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-green-400 font-mono text-xl mb-2">No Pending Requests</h3>
                  <p className="text-green-600">All unban requests have been processed</p>
                </div>
              ) : (
                unbanRequests
                  .filter(req => req.status === 'pending')
                  .map((request) => (
                    <div
                      key={request.id}
                      className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-blue-400 font-mono font-bold">{request.username}</h3>
                          <p className="text-blue-600 text-sm">
                            Requested: {new Date(request.requestedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUnbanRequest(request, 'approve')}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded font-mono"
                          >
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleUnbanRequest(request, 'reject')}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-mono"
                          >
                            <XCircle className="w-3 h-3 inline mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-blue-400 font-mono text-sm">Violation:</span>
                          <p className="text-blue-300 text-sm">{request.violation}</p>
                        </div>
                        <div>
                          <span className="text-blue-400 font-mono text-sm">Request Message:</span>
                          <p className="text-blue-300 text-sm">{request.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* Site Settings */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Theme
                  </label>
                  <select
                    value={adminSettings.theme}
                    onChange={(e) => setAdminSettings({...adminSettings, theme: e.target.value as any})}
                    className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                  >
                    <option value="dark">Dark Green</option>
                    <option value="green">Matrix Green</option>
                    <option value="blue">Cyber Blue</option>
                    <option value="purple">Neon Purple</option>
                  </select>
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    Background Video URL
                  </label>
                  <input
                    type="url"
                    value={adminSettings.backgroundVideo}
                    onChange={(e) => setAdminSettings({...adminSettings, backgroundVideo: e.target.value})}
                    className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">
                  Welcome Message
                </label>
                <textarea
                  value={adminSettings.welcomeMessage}
                  onChange={(e) => setAdminSettings({...adminSettings, welcomeMessage: e.target.value})}
                  className="w-full h-24 px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 resize-none"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                  <div>
                    <h3 className="text-green-400 font-mono font-bold">Allow Registration</h3>
                    <p className="text-green-600 font-mono text-sm">Enable new user registration</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={adminSettings.allowRegistration}
                      onChange={(e) => setAdminSettings({...adminSettings, allowRegistration: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                  <div>
                    <h3 className="text-green-400 font-mono font-bold">Maintenance Mode</h3>
                    <p className="text-green-600 font-mono text-sm">Disable site for maintenance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={adminSettings.maintenanceMode}
                      onChange={(e) => setAdminSettings({...adminSettings, maintenanceMode: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSettingsUpdate}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-mono text-lg px-6 py-3 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 inline mr-2" />
                Update Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;