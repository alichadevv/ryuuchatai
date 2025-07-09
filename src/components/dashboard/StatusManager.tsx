import React, { useState, useEffect } from 'react';
import { 
  Circle, 
  Plus, 
  Camera, 
  Image as ImageIcon, 
  Mic, 
  Type,
  Eye,
  EyeOff,
  Users,
  UserCheck,
  UserX,
  Palette,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Clock
} from 'lucide-react';
import { User, StatusUpdate, Contact } from '../../types';

interface StatusManagerProps {
  user: User;
}

const StatusManager: React.FC<StatusManagerProps> = ({ user }) => {
  const [statuses, setStatuses] = useState<StatusUpdate[]>([]);
  const [myStatuses, setMyStatuses] = useState<StatusUpdate[]>([]);
  const [showCreateStatus, setShowCreateStatus] = useState(false);
  const [newStatus, setNewStatus] = useState({
    content: '',
    mediaUrl: '',
    mediaType: 'text' as 'text' | 'image' | 'video' | 'audio',
    privacy: 'contacts' as 'everyone' | 'contacts' | 'except' | 'only',
    backgroundColor: '#000000',
    textColor: '#00ff00',
    allowedUsers: [] as string[],
    blockedUsers: [] as string[]
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'view' | 'my'>('view');
  const [selectedStatus, setSelectedStatus] = useState<StatusUpdate | null>(null);

  // Mock users for demo
  const [allUsers] = useState<User[]>([
    {
      id: '1',
      username: 'alice_hacker',
      email: 'alice@example.com',
      isAdmin: false,
      joinedAt: new Date(),
      lastSeen: new Date(),
      status: 'online',
      blockedUsers: [],
      warnings: [],
      contacts: [],
      statusUpdates: []
    },
    {
      id: '2',
      username: 'bob_security',
      email: 'bob@example.com',
      isAdmin: false,
      joinedAt: new Date(),
      lastSeen: new Date(),
      status: 'away',
      blockedUsers: [],
      warnings: [],
      contacts: [],
      statusUpdates: []
    }
  ]);

  useEffect(() => {
    // Load statuses and contacts
    const savedStatuses = localStorage.getItem('plankxploit_statuses');
    const savedMyStatuses = localStorage.getItem(`plankxploit_my_statuses_${user.id}`);
    const savedContacts = localStorage.getItem(`plankxploit_contacts_${user.id}`);

    if (savedStatuses) {
      const allStatuses = JSON.parse(savedStatuses);
      // Filter statuses based on privacy settings
      const visibleStatuses = allStatuses.filter((status: StatusUpdate) => {
        if (status.userId === user.id) return false; // Don't show own statuses in main feed
        
        // Check if status has expired
        if (new Date(status.expiresAt) < new Date()) return false;

        switch (status.privacy) {
          case 'everyone':
            return true;
          case 'contacts':
            return contacts.some(c => c.contactUserId === status.userId && !c.isBlocked);
          case 'except':
            return !status.blockedUsers?.includes(user.id);
          case 'only':
            return status.allowedUsers?.includes(user.id);
          default:
            return false;
        }
      });
      setStatuses(visibleStatuses);
    }

    if (savedMyStatuses) {
      const myStatusList = JSON.parse(savedMyStatuses);
      // Remove expired statuses
      const activeStatuses = myStatusList.filter((status: StatusUpdate) => 
        new Date(status.expiresAt) > new Date()
      );
      setMyStatuses(activeStatuses);
      // Update localStorage with active statuses only
      localStorage.setItem(`plankxploit_my_statuses_${user.id}`, JSON.stringify(activeStatuses));
    }

    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, [user.id]);

  const createStatus = () => {
    if (!newStatus.content.trim() && !newStatus.mediaUrl) return;

    const status: StatusUpdate = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      content: newStatus.content,
      mediaUrl: newStatus.mediaUrl || undefined,
      mediaType: newStatus.mediaType === 'text' ? undefined : newStatus.mediaType,
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      privacy: newStatus.privacy,
      viewedBy: [],
      allowedUsers: newStatus.allowedUsers,
      blockedUsers: newStatus.blockedUsers,
      backgroundColor: newStatus.backgroundColor,
      textColor: newStatus.textColor
    };

    // Add to my statuses
    const updatedMyStatuses = [...myStatuses, status];
    setMyStatuses(updatedMyStatuses);
    localStorage.setItem(`plankxploit_my_statuses_${user.id}`, JSON.stringify(updatedMyStatuses));

    // Add to global statuses
    const savedStatuses = localStorage.getItem('plankxploit_statuses');
    const allStatuses = savedStatuses ? JSON.parse(savedStatuses) : [];
    allStatuses.push(status);
    localStorage.setItem('plankxploit_statuses', JSON.stringify(allStatuses));

    // Reset form
    setNewStatus({
      content: '',
      mediaUrl: '',
      mediaType: 'text',
      privacy: 'contacts',
      backgroundColor: '#000000',
      textColor: '#00ff00',
      allowedUsers: [],
      blockedUsers: []
    });
    setShowCreateStatus(false);
  };

  const viewStatus = (status: StatusUpdate) => {
    if (!status.viewedBy.includes(user.id)) {
      // Mark as viewed
      const updatedStatus = {
        ...status,
        viewedBy: [...status.viewedBy, user.id]
      };

      // Update in global statuses
      const savedStatuses = localStorage.getItem('plankxploit_statuses');
      if (savedStatuses) {
        const allStatuses = JSON.parse(savedStatuses);
        const updatedStatuses = allStatuses.map((s: StatusUpdate) => 
          s.id === status.id ? updatedStatus : s
        );
        localStorage.setItem('plankxploit_statuses', JSON.stringify(updatedStatuses));
      }

      // Update local state
      setStatuses(prev => prev.map(s => s.id === status.id ? updatedStatus : s));
    }
    setSelectedStatus(status);
  };

  const deleteStatus = (statusId: string) => {
    // Remove from my statuses
    const updatedMyStatuses = myStatuses.filter(s => s.id !== statusId);
    setMyStatuses(updatedMyStatuses);
    localStorage.setItem(`plankxploit_my_statuses_${user.id}`, JSON.stringify(updatedMyStatuses));

    // Remove from global statuses
    const savedStatuses = localStorage.getItem('plankxploit_statuses');
    if (savedStatuses) {
      const allStatuses = JSON.parse(savedStatuses);
      const updatedStatuses = allStatuses.filter((s: StatusUpdate) => s.id !== statusId);
      localStorage.setItem('plankxploit_statuses', JSON.stringify(updatedStatuses));
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const getExpiryTime = (expiresAt: Date) => {
    const now = new Date();
    const diff = new Date(expiresAt).getTime() - now.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (hours > 0) return `${hours}h ${minutes}m left`;
    if (minutes > 0) return `${minutes}m left`;
    return 'Expiring soon';
  };

  const backgroundColors = [
    '#000000', '#1a1a1a', '#2d2d2d', '#0f172a', '#1e293b',
    '#dc2626', '#ea580c', '#d97706', '#65a30d', '#16a34a',
    '#0891b2', '#2563eb', '#7c3aed', '#c026d3', '#e11d48'
  ];

  const textColors = [
    '#00ff00', '#ffffff', '#ff0000', '#ffff00', '#00ffff',
    '#ff00ff', '#ffa500', '#90ee90', '#87ceeb', '#dda0dd'
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="bg-black/90 border border-green-500/30 rounded-xl backdrop-blur-sm">
        {/* Header */}
        <div className="p-6 border-b border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Circle className="w-8 h-8 text-green-400" />
              <div>
                <h2 className="text-2xl font-mono font-bold text-green-400">Status Updates</h2>
                <p className="text-green-600 font-mono">Share your moments</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateStatus(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Status</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-4 py-2 font-mono rounded-lg transition-colors ${
                activeTab === 'view'
                  ? 'bg-green-600 text-white'
                  : 'text-green-400 hover:bg-green-400/10'
              }`}
            >
              View Status ({statuses.length})
            </button>
            <button
              onClick={() => setActiveTab('my')}
              className={`px-4 py-2 font-mono rounded-lg transition-colors ${
                activeTab === 'my'
                  ? 'bg-green-600 text-white'
                  : 'text-green-400 hover:bg-green-400/10'
              }`}
            >
              My Status ({myStatuses.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          {activeTab === 'view' ? (
            // View Others' Status
            <div className="space-y-4">
              {statuses.length === 0 ? (
                <div className="text-center py-12">
                  <Circle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-green-400 font-mono text-xl mb-2">No Status Updates</h3>
                  <p className="text-green-600">No recent status updates from your contacts</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => viewStatus(status)}
                      className="relative bg-black/50 border border-green-500/30 rounded-lg p-4 hover:border-green-400 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            status.viewedBy.includes(user.id) ? 'border-2 border-gray-500' : 'border-2 border-green-400'
                          }`}>
                            <span className="text-green-400 font-mono font-bold">
                              {status.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-green-400 font-mono font-bold">{status.username}</h3>
                          <p className="text-green-600 text-sm">{getTimeAgo(status.timestamp)}</p>
                        </div>
                      </div>

                      <div 
                        className="rounded-lg p-3 mb-2 min-h-[60px] flex items-center justify-center"
                        style={{ 
                          backgroundColor: status.backgroundColor,
                          color: status.textColor 
                        }}
                      >
                        {status.mediaType === 'image' && status.mediaUrl ? (
                          <img src={status.mediaUrl} alt="Status" className="max-w-full max-h-32 rounded" />
                        ) : status.mediaType === 'video' && status.mediaUrl ? (
                          <video src={status.mediaUrl} className="max-w-full max-h-32 rounded" />
                        ) : (
                          <p className="font-mono text-center">{status.content}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-600">{status.viewedBy.length} views</span>
                        <span className="text-green-600">{getExpiryTime(status.expiresAt)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // My Status
            <div className="space-y-4">
              {myStatuses.length === 0 ? (
                <div className="text-center py-12">
                  <Circle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-green-400 font-mono text-xl mb-2">No Status Updates</h3>
                  <p className="text-green-600">Create your first status update</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myStatuses.map((status) => (
                    <div
                      key={status.id}
                      className="relative bg-black/50 border border-green-500/30 rounded-lg p-4"
                    >
                      <button
                        onClick={() => deleteStatus(status.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>

                      <div 
                        className="rounded-lg p-3 mb-3 min-h-[60px] flex items-center justify-center"
                        style={{ 
                          backgroundColor: status.backgroundColor,
                          color: status.textColor 
                        }}
                      >
                        {status.mediaType === 'image' && status.mediaUrl ? (
                          <img src={status.mediaUrl} alt="Status" className="max-w-full max-h-32 rounded" />
                        ) : status.mediaType === 'video' && status.mediaUrl ? (
                          <video src={status.mediaUrl} className="max-w-full max-h-32 rounded" />
                        ) : (
                          <p className="font-mono text-center">{status.content}</p>
                        )}
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-green-600">{status.viewedBy.length} views</span>
                          <span className="text-green-600">{getExpiryTime(status.expiresAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">Privacy:</span>
                          <span className="text-green-400 capitalize">{status.privacy}</span>
                        </div>
                        <p className="text-green-600">{getTimeAgo(status.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Status Modal */}
      {showCreateStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-green-500/30 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-green-400 font-mono text-lg font-bold mb-4">Create Status Update</h3>
            
            <div className="space-y-4">
              {/* Content Type */}
              <div className="flex space-x-2">
                {[
                  { type: 'text', icon: Type, label: 'Text' },
                  { type: 'image', icon: ImageIcon, label: 'Image' },
                  { type: 'video', icon: Camera, label: 'Video' },
                  { type: 'audio', icon: Mic, label: 'Audio' }
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setNewStatus({...newStatus, mediaType: option.type as any})}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-mono transition-colors ${
                      newStatus.mediaType === option.type
                        ? 'bg-green-600 text-white'
                        : 'bg-black/50 text-green-400 hover:bg-green-400/10'
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Media URL */}
              {newStatus.mediaType !== 'text' && (
                <input
                  type="url"
                  placeholder={`${newStatus.mediaType} URL...`}
                  value={newStatus.mediaUrl}
                  onChange={(e) => setNewStatus({...newStatus, mediaUrl: e.target.value})}
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                />
              )}

              {/* Text Content */}
              <textarea
                placeholder="What's on your mind?"
                value={newStatus.content}
                onChange={(e) => setNewStatus({...newStatus, content: e.target.value})}
                className="w-full h-24 px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 resize-none"
              />

              {/* Style Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">Background Color</label>
                  <div className="flex flex-wrap gap-2">
                    {backgroundColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewStatus({...newStatus, backgroundColor: color})}
                        className={`w-8 h-8 rounded border-2 ${
                          newStatus.backgroundColor === color ? 'border-green-400' : 'border-gray-600'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">Text Color</label>
                  <div className="flex flex-wrap gap-2">
                    {textColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewStatus({...newStatus, textColor: color})}
                        className={`w-8 h-8 rounded border-2 ${
                          newStatus.textColor === color ? 'border-green-400' : 'border-gray-600'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">Privacy</label>
                <select
                  value={newStatus.privacy}
                  onChange={(e) => setNewStatus({...newStatus, privacy: e.target.value as any})}
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                >
                  <option value="everyone">Everyone</option>
                  <option value="contacts">My Contacts</option>
                  <option value="except">Everyone Except...</option>
                  <option value="only">Only Share With...</option>
                </select>
              </div>

              {/* Preview */}
              <div className="border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-mono font-bold mb-2">Preview</h4>
                <div 
                  className="rounded-lg p-3 min-h-[60px] flex items-center justify-center"
                  style={{ 
                    backgroundColor: newStatus.backgroundColor,
                    color: newStatus.textColor 
                  }}
                >
                  <p className="font-mono text-center">{newStatus.content || 'Your status text will appear here...'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowCreateStatus(false)}
                className="px-4 py-2 text-green-400 hover:text-green-300 font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createStatus}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Post Status</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Viewer Modal */}
      {selectedStatus && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="relative max-w-2xl w-full mx-4">
            <button
              onClick={() => setSelectedStatus(null)}
              className="absolute -top-12 right-0 text-white hover:text-green-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="bg-black/90 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-white font-mono font-bold">
                    {selectedStatus.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-green-400 font-mono font-bold">{selectedStatus.username}</h3>
                  <p className="text-green-600 text-sm">{getTimeAgo(selectedStatus.timestamp)}</p>
                </div>
              </div>

              <div 
                className="rounded-lg p-6 mb-4 min-h-[200px] flex items-center justify-center"
                style={{ 
                  backgroundColor: selectedStatus.backgroundColor,
                  color: selectedStatus.textColor 
                }}
              >
                {selectedStatus.mediaType === 'image' && selectedStatus.mediaUrl ? (
                  <img src={selectedStatus.mediaUrl} alt="Status" className="max-w-full max-h-64 rounded" />
                ) : selectedStatus.mediaType === 'video' && selectedStatus.mediaUrl ? (
                  <video src={selectedStatus.mediaUrl} controls className="max-w-full max-h-64 rounded" />
                ) : selectedStatus.mediaType === 'audio' && selectedStatus.mediaUrl ? (
                  <audio src={selectedStatus.mediaUrl} controls className="w-full" />
                ) : (
                  <p className="font-mono text-center text-xl">{selectedStatus.content}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600">{selectedStatus.viewedBy.length} views</span>
                <span className="text-green-600">{getExpiryTime(selectedStatus.expiresAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusManager;