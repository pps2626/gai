import { User, Product, ChatMessage, Role, PrivateChatMessage } from './types';

export const MOCK_USERS: User[] = [
  { 
    id: 'admin-001', 
    username: 'admin', 
    password: 'password', 
    role: Role.ADMIN, 
    avatarUrl: 'https://i.pravatar.cc/150?u=admin-001',
    location: 'Control Room'
  },
  { 
    id: 'seller-001', 
    username: 'seller', 
    password: 'password', 
    role: Role.SELLER, 
    avatarUrl: 'https://i.pravatar.cc/150?u=seller-001',
    location: 'California',
    rate: 60
  },
  { 
    id: 'seller-002', 
    username: 'greenthumb', 
    password: 'password', 
    role: Role.SELLER, 
    avatarUrl: 'https://i.pravatar.cc/150?u=seller-002',
    location: 'Colorado',
    rate: 65
  },
  { 
    id: 'buyer-001', 
    username: 'buyer', 
    password: 'password', 
    role: Role.BUYER, 
    avatarUrl: 'https://i.pravatar.cc/150?u=buyer-001',
    location: 'New York'
  },
  { 
    id: 'buyer-002', 
    username: 'janedoe', 
    password: 'password', 
    role: Role.BUYER, 
    avatarUrl: 'https://i.pravatar.cc/150?u=buyer-002',
    location: 'Florida'
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Cosmic Kush',
    strain: 'Indica',
    price: 45.00,
    sellerId: 'seller-001',
    description: 'A relaxing strain perfect for starry nights and deep thoughts.',
    imageUrl: 'https://images.unsplash.com/photo-1556928045-16f7f50be0f3?q=80&w=800',
  },
  {
    id: 'prod-002',
    name: 'Solar Flare',
    strain: 'Sativa',
    price: 55.00,
    sellerId: 'seller-001',
    description: 'An energetic boost for creative tasks and daytime adventures.',
    imageUrl: 'https://images.unsplash.com/photo-1621293322431-f8a709044317?q=80&w=800',
  },
  {
    id: 'prod-003',
    name: 'Galaxy Glue',
    strain: 'Hybrid',
    price: 50.00,
    sellerId: 'seller-002',
    description: 'A balanced hybrid that offers the best of both worlds.',
    imageUrl: 'https://images.unsplash.com/photo-1560946164-9a741eb55662?q=80&w=800',
  },
  {
    id: 'prod-004',
    name: 'Morning Dew',
    strain: 'Sativa',
    price: 52.00,
    sellerId: 'seller-002',
    description: 'A crisp and refreshing strain to start your day with focus.',
    imageUrl: 'https://images.unsplash.com/photo-1599282382410-8335fac13733?q=80&w=800',
  },
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    senderId: 'buyer-001',
    senderUsername: 'buyer',
    text: 'Has anyone tried the Solar Flare?',
    timestamp: Date.now() - 1000 * 60 * 5,
  },
  {
    id: 'msg-002',
    senderId: 'seller-001',
    senderUsername: 'seller',
    text: 'I highly recommend it! It\'s one of our most popular products for creativity.',
    timestamp: Date.now() - 1000 * 60 * 4,
  },
];

export const MOCK_PRIVATE_MESSAGES: PrivateChatMessage[] = [
    {
        id: 'pmsg-001',
        senderId: 'buyer-001',
        receiverId: 'seller-001',
        text: 'Hey, I had a question about the Cosmic Kush.',
        timestamp: Date.now() - 1000 * 60 * 10,
    },
    {
        id: 'pmsg-002',
        senderId: 'seller-001',
        receiverId: 'buyer-001',
        text: 'Sure, what would you like to know?',
        timestamp: Date.now() - 1000 * 60 * 9,
    },
];
