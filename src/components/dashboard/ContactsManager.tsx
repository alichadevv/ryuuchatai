import React, { useState, useEffect } from 'react';
import { Users, Search, UserPlus, MessageSquare, Phone, Video, MoreVertical, Blocks as Block, Trash2, Edit3, Star, UserX, Check, X } from 'lucide-react';
import { User, Contact } from '../../types';

interface ContactsManagerProps {
  user: User;
}

const ContactsManager: React.FC<ContactsManagerProps> = ({ user }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingName, setEditingName] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'blocked'>('all');

  // Mock users database - in real app this would come from API
  const [allUsers] = useState<User[]>([
    {
      id: '1',
      username: 'ryuu_ganteng',
      email: 'ryuu@example.com',
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
    },
    {
      id: '3',
      username: 'charlie_dev',
      email: 'charlie@example.com',
      isAdmin: true,
      joinedAt: new Date(),
      lastSeen: new Date(),
      status: 'offline',
      blockedUsers: [],
      warnings: [],
      contacts: [],
      statusUpdates: []
    }
  ]);

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = localStorage.getItem(`ryuuizumi_contacts_${user.id}`);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, [user.id]);

  useEffect(() => {
    // Save contacts to localStorage
    localStorage.setItem(`ryuuizumi_contacts_${user.id}`, JSON.stringify(contacts));
  }, [contacts, user.id]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      const results = allUsers.filter(u => 
        u.id !== user.id && 
        (u.username.toLowerCase().includes(term.toLowerCase()) ||
         u.email.toLowerCase().includes(term.toLowerCase()) ||
         u.id.includes(term))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addContact = (contactUser: User) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      userId: user.id,
      contactUserId: contactUser.id,
      contactUsername: contactUser.username,
      isBlocked: false,
      addedAt: new Date(),
      isFavorite: false
    };

    setContacts(prev => [...prev, newContact]);
    setSearchTerm('');
    setSearchResults([]);
    setShowAddContact(false);
  };

  const toggleFavorite = (contactId: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    ));
  };

  const toggleBlock = (contactId: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, isBlocked: !contact.isBlocked }
        : contact
    ));
  };

  const updateContactName = (contactId: string, customName: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, customName: customName || undefined }
        : contact
    ));
    setSelectedContact(null);
    setEditingName('');
  };

  const deleteContact = (contactId: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const getFilteredContacts = () => {
    let filtered = contacts;
    
    switch (activeTab) {
      case 'favorites':
        filtered = contacts.filter(c => c.isFavorite);
        break;
      case 'blocked':
        filtered = contacts.filter(c => c.isBlocked);
        break;
      default:
        filtered = contacts.filter(c => !c.isBlocked);
    }

    if (searchTerm) {
      filtered = filtered.filter(contact => 
        (contact.customName || contact.contactUsername).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getContactUser = (contact: Contact) => {
    return allUsers.find(u => u.id === contact.contactUserId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="bg-black/90 border border-green-500/30 rounded-xl backdrop-blur-sm">
        {/* Header */}
        <div className="p-6 border-b border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-400" />
              <div>
                <h2 className="text-2xl font-mono font-bold text-green-400">Contacts</h2>
                <p className="text-green-600 font-mono">{contacts.length} contacts</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddContact(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-colors flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-green-500/30">
          {[
            { id: 'all', label: 'All Contacts', count: contacts.filter(c => !c.isBlocked).length },
            { id: 'favorites', label: 'Favorites', count: contacts.filter(c => c.isFavorite).length },
            { id: 'blocked', label: 'Blocked', count: contacts.filter(c => c.isBlocked).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 font-mono transition-colors ${
                activeTab === tab.id
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-green-600 hover:text-green-400'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Contacts List */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          {getFilteredContacts().length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-green-400 font-mono text-xl mb-2">No Contacts</h3>
              <p className="text-green-600">Add some contacts to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredContacts().map((contact) => {
                const contactUser = getContactUser(contact);
                if (!contactUser) return null;

                return (
                  <div
                    key={contact.id}
                    className="bg-black/50 border border-green-500/30 rounded-lg p-4 hover:border-green-400 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <img
                          src={contactUser.avatar || "https://files.catbox.moe/hla7hv.jpg"}
                          alt={contact.customName || contact.contactUsername}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contactUser.status)} rounded-full border-2 border-black`}></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-green-400 font-mono font-bold">
                          {contact.customName || contact.contactUsername}
                        </h3>
                        <p className="text-green-600 text-sm">{contactUser.status}</p>
                        {contact.customName && (
                          <p className="text-green-700 text-xs">@{contact.contactUsername}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {contact.isFavorite && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                        {contact.isBlocked && (
                          <Block className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors">
                          <Video className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setSelectedContact(selectedContact?.id === contact.id ? null : contact)}
                          className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {selectedContact?.id === contact.id && (
                          <div className="absolute right-0 top-full mt-2 bg-black/90 border border-green-500/30 rounded-lg py-2 z-10 min-w-[150px]">
                            <button
                              onClick={() => {
                                setEditingName(contact.customName || contact.contactUsername);
                                // Show edit modal
                              }}
                              className="w-full px-4 py-2 text-left text-green-400 hover:bg-green-400/10 flex items-center space-x-2"
                            >
                              <Edit3 className="w-4 h-4" />
                              <span>Edit Name</span>
                            </button>
                            <button
                              onClick={() => toggleFavorite(contact.id)}
                              className="w-full px-4 py-2 text-left text-yellow-400 hover:bg-yellow-400/10 flex items-center space-x-2"
                            >
                              <Star className="w-4 h-4" />
                              <span>{contact.isFavorite ? 'Remove Favorite' : 'Add Favorite'}</span>
                            </button>
                            <button
                              onClick={() => toggleBlock(contact.id)}
                              className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-400/10 flex items-center space-x-2"
                            >
                              {contact.isBlocked ? <UserX className="w-4 h-4" /> : <Block className="w-4 h-4" />}
                              <span>{contact.isBlocked ? 'Unblock' : 'Block'}</span>
                            </button>
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-400/10 flex items-center space-x-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-green-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-green-400 font-mono text-lg font-bold mb-4">Add New Contact</h3>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by username, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {searchResults.map((searchUser) => (
                    <div
                      key={searchUser.id}
                      className="flex items-center justify-between p-3 bg-black/50 border border-green-500/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={searchUser.avatar || "https://files.catbox.moe/hla7hv.jpg"}
                          alt={searchUser.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <h4 className="text-green-400 font-mono font-bold text-sm">{searchUser.username}</h4>
                          <p className="text-green-600 text-xs">{searchUser.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addContact(searchUser)}
                        disabled={contacts.some(c => c.contactUserId === searchUser.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xs rounded font-mono"
                      >
                        {contacts.some(c => c.contactUserId === searchUser.id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowAddContact(false);
                  setSearchTerm('');
                  setSearchResults([]);
                }}
                className="px-4 py-2 text-green-400 hover:text-green-300 font-mono transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Name Modal */}
      {editingName !== '' && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-green-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-green-400 font-mono text-lg font-bold mb-4">Edit Contact Name</h3>
            
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 mb-4"
              placeholder="Enter custom name..."
            />
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setEditingName('');
                  setSelectedContact(null);
                }}
                className="px-4 py-2 text-green-400 hover:text-green-300 font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => updateContactName(selectedContact.id, editingName)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-mono rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManager;