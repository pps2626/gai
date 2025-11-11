export enum Role {
  ADMIN = 'Admin',
  SELLER = 'Seller',
  BUYER = 'Buyer',
}

export interface User {
  id: string;
  username: string;
  role: Role;
  password?: string;
  avatarUrl?: string;
  location?: string;
  rate?: number; // For sellers
}

export interface Product {
  id: string;
  name: string;
  strain: 'Sativa' | 'Indica' | 'Hybrid';
  price: number;
  sellerId: string;
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderUsername: string;
  text: string;
  timestamp: number;
}

export interface PrivateChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}
