import React, { useState } from 'react';
import { User, Mail, Camera, Shield, Bell, Lock, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '../../types';

interface SettingsProps {
  user: UserType;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user.username,
    email: user.email,
    description: user.description || '',
    avatar: user.avatar || ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock }
  ];

  const handleSave = () => {
    // Save profile data
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    // Handle password change
    alert('Password updated successfully!');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="bg-black/90 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-mono font-bold text-green-400 mb-2">
            Account Settings
          </h2>
          <p className="text-green-600 font-mono">
            Manage your account and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-green-500/30 mb-8">
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={profileData.avatar || "https://files.catbox.moe/hla7hv.jpg"}
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-green-500/50 object-cover"
                />
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">
                Description
              </label>
              <textarea
                value={profileData.description}
                onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 h-24 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-mono text-lg px-6 py-3 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 pr-12"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                placeholder="Confirm new password"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-mono text-lg px-6 py-3 rounded-lg transition-colors"
            >
              Update Password
            </button>

            <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <h3 className="text-green-400 font-mono font-bold mb-2">Two-Factor Authentication</h3>
              <p className="text-green-600 font-mono text-sm mb-4">
                Add an extra layer of security to your account
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-mono px-4 py-2 rounded-lg transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-green-400 font-mono font-bold">Message Notifications</h3>
                  <p className="text-green-600 font-mono text-sm">Get notified when you receive new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-green-400 font-mono font-bold">Group Invitations</h3>
                  <p className="text-green-600 font-mono text-sm">Get notified when you're invited to a group</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-green-400 font-mono font-bold">System Updates</h3>
                  <p className="text-green-600 font-mono text-sm">Get notified about system updates and maintenance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-green-400 font-mono font-bold">Profile Visibility</h3>
                  <p className="text-green-600 font-mono text-sm">Control who can see your profile</p>
                </div>
                <select className="bg-black/50 border border-green-500/50 rounded-lg px-3 py-2 text-green-300 font-mono focus:outline-none focus:border-green-400">
                  <option>Everyone</option>
                  <option>Contacts Only</option>
                  <option>Nobody</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-green-400 font-mono font-bold">Last Seen</h3>
                  <p className="text-green-600 font-mono text-sm">Control who can see when you were last online</p>
                </div>
                <select className="bg-black/50 border border-green-500/50 rounded-lg px-3 py-2 text-green-300 font-mono focus:outline-none focus:border-green-400">
                  <option>Everyone</option>
                  <option>Contacts Only</option>
                  <option>Nobody</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/50 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-green-400 font-mono font-bold">Read Receipts</h3>
                  <p className="text-green-600 font-mono text-sm">Show when you've read messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;