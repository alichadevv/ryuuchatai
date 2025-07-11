import React from 'react';
import { 
  X, 
  Home, 
  MessageSquare, 
  Mail, 
  Play, 
  Star, 
  Bot, 
  Settings,
  Shield,
  Users,
  Circle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'text-green-400' },
    { id: 'chat', icon: MessageSquare, label: 'Chat Group', color: 'text-blue-400' },
    { id: 'contacts', icon: Users, label: 'Contacts', color: 'text-purple-400' },
    { id: 'status', icon: Circle, label: 'Status', color: 'text-orange-400' },
    { id: 'message-developer', icon: Mail, label: 'Message Developer', color: 'text-purple-400' },
    { id: 'content', icon: Play, label: 'Content', color: 'text-red-400' },
    { id: 'rating', icon: Star, label: 'Rating', color: 'text-yellow-400' },
    { id: 'chat-ai', icon: Bot, label: 'Chat AI', color: 'text-cyan-400' },
    { id: 'settings', icon: Settings, label: 'Settings Account', color: 'text-gray-400' },
    { id: 'admin', icon: Shield, label: 'Admin Panel', color: 'text-red-400' }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-black/95 border-r border-green-500/30 backdrop-blur-sm transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-500/30">
          <div>
            <h2 className="text-xl font-mono font-bold text-green-400">Menu</h2>
            <p className="text-green-600 text-sm">Navigation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-mono transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-green-400/20 text-green-400 border border-green-500/30'
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-green-400' : item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-500/30">
          <div className="text-center text-green-600 font-mono text-sm">
            <p>Ryuu Izumi v2.1</p>
            <p className="text-xs mt-1">Secure Communication</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;