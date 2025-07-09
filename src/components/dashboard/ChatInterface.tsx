import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Phone, 
  Video, 
  Users, 
  Settings, 
  Search,
  Plus,
  MoreVertical,
  Image as ImageIcon,
  File,
  Camera
} from 'lucide-react';
import { User, Message, Group } from '../../types';

interface ChatInterfaceProps {
  user: User;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with a default group
    const defaultGroup: Group = {
      id: 'default',
      name: 'PlankXploit Community',
      description: 'Welcome to the main community chat',
      ownerId: 'admin',
      admins: ['admin'],
      members: [user.id, 'admin'],
      inviteLink: 'https://plankxploit.com/invite/default',
      createdAt: new Date(),
      isPrivate: false,
      settings: {
        allowMemberInvite: true,
        allowMediaShare: true,
        allowVoiceCall: true
      }
    };

    setGroups([defaultGroup]);
    setActiveGroup(defaultGroup);

    // Load initial messages
    const initialMessages: Message[] = [
      {
        id: '1',
        senderId: 'admin',
        senderName: 'PlankXploit',
        content: 'Welcome to PlankXploit Community! 🚀',
        timestamp: new Date(),
        type: 'text',
        groupId: 'default'
      }
    ];
    setMessages(initialMessages);
  }, [user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeGroup) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.username,
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      groupId: activeGroup.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.groupId === activeGroup?.id &&
    (msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
     msg.senderName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-full bg-black/90">
      {/* Sidebar */}
      <div className="w-80 border-r border-green-500/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-green-400 font-mono text-lg font-bold">Chat Groups</h2>
            <button
              onClick={() => setShowGroupModal(true)}
              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
            />
          </div>
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group)}
              className={`w-full p-4 text-left border-b border-green-500/20 hover:bg-green-400/10 transition-colors ${
                activeGroup?.id === group.id ? 'bg-green-400/20' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-green-400 font-mono font-bold text-sm">{group.name}</h3>
                  <p className="text-green-600 text-xs truncate">{group.description}</p>
                  <p className="text-green-700 text-xs">{group.members.length} members</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {activeGroup ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-green-500/30 bg-black/90">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-green-400 font-mono font-bold">{activeGroup.name}</h3>
                    <p className="text-green-600 text-sm">{activeGroup.members.length} members</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-300px)]">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-green-300'
                    }`}
                  >
                    {message.senderId !== user.id && (
                      <p className="text-xs text-green-400 mb-1">{message.senderName}</p>
                    )}
                    <p className="font-mono text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-green-500/30 bg-black/90">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                />
                
                <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-green-400 font-mono text-xl mb-2">Select a Group</h3>
              <p className="text-green-600">Choose a group to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-green-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-green-400 font-mono text-lg font-bold mb-4">Create New Group</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Group name"
                className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
              />
              <textarea
                placeholder="Group description"
                className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 h-24 resize-none"
              />
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowGroupModal(false)}
                className="px-4 py-2 text-green-400 hover:text-green-300 font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowGroupModal(false)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-colors"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;