export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  description?: string;
  isAdmin: boolean;
  isSuperAdmin?: boolean;
  isBanned?: boolean;
  banReason?: string;
  bannedAt?: Date;
  bannedBy?: string;
  joinedAt: Date;
  lastSeen: Date;
  status: 'online' | 'offline' | 'away';
  blockedUsers: string[];
  warnings: Warning[];
  contacts: Contact[];
  statusUpdates: StatusUpdate[];
}

export interface Warning {
  id: string;
  message: string;
  sentBy: string;
  sentAt: Date;
  acknowledged: boolean;
}

export interface UnbanRequest {
  id: string;
  userId: string;
  username: string;
  message: string;
  violation: string;
  requestedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AdminSettings {
  theme: 'dark' | 'green' | 'blue' | 'purple';
  backgroundVideo: string;
  allowRegistration: boolean;
  maintenanceMode: boolean;
  welcomeMessage: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  fileUrl?: string;
  fileName?: string;
  groupId?: string;
  receiverId?: string;
  isEdited?: boolean;
  replyTo?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  ownerId: string;
  admins: string[];
  members: string[];
  inviteLink: string;
  createdAt: Date;
  isPrivate: boolean;
  settings: {
    allowMemberInvite: boolean;
    allowMediaShare: boolean;
    allowVoiceCall: boolean;
  };
}

export interface Contact {
  id: string;
  userId: string; // Owner of the contact list
  contactUserId: string; // The contact's user ID
  contactUsername: string; // Display name for the contact
  customName?: string; // Custom name set by user
  isBlocked: boolean;
  addedAt: Date;
  lastMessageAt?: Date;
  isFavorite: boolean;
}

export interface StatusUpdate {
  id: string;
  userId: string;
  username: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
  timestamp: Date;
  expiresAt: Date;
  privacy: 'everyone' | 'contacts' | 'except' | 'only';
  viewedBy: string[];
  allowedUsers?: string[];
  blockedUsers?: string[];
  backgroundColor?: string;
  textColor?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface VerificationState {
  whatsapp1: boolean;
  whatsapp2: boolean;
  whatsapp3: boolean;
  whatsappGroup: boolean;
  tiktok: boolean;
  instagram: boolean;
}

export interface ChatState {
  activeChat: string | null;
  chatType: 'group' | 'private' | null;
  messages: Message[];
  typing: { [key: string]: boolean };
}