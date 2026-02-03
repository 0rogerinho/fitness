// Model - Types and interfaces for Social Network
export type TabType = 'feed' | 'challenges' | 'ranking';

export interface Post {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  userLiked: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  endDate: string;
  reward: number;
}

export interface RankingUser {
  position: number;
  name: string;
  points: number;
}

export class RedeSocialModel {
  static getMockPosts(): Post[] {
    return [
      {
        id: '1',
        userName: 'John Smith',
        content: 'Just completed my hypertrophy workout! 💪 #FitnessAI',
        image:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
        likes: 24,
        comments: 5,
        time: '2h',
        userLiked: false,
      },
      {
        id: '2',
        userName: 'Mary Santos',
        content: 'First 5km run complete! So happy! 🏃‍♀️',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
        likes: 42,
        comments: 8,
        time: '5h',
        userLiked: true,
      },
      {
        id: '3',
        userName: 'Peter Costa',
        content: 'Weight loss workout was amazing today! #Motivated',
        image:
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
        likes: 18,
        comments: 3,
        time: '1d',
        userLiked: false,
      },
      {
        id: '4',
        userName: 'Anna Oliveira',
        content: 'Active rest day with yoga and meditation. Balance is key! 🧘‍♀️',
        image:
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
        likes: 35,
        comments: 12,
        time: '3h',
        userLiked: true,
      },
      {
        id: '5',
        userName: 'Carl Mendes',
        content: 'New personal record on bench press! 120kg today! 🔥',
        image:
          'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=800&h=800&fit=crop',
        likes: 67,
        comments: 15,
        time: '6h',
        userLiked: false,
      },
      {
        id: '6',
        userName: 'Julia Ferreira',
        content: "Intense leg workout! Don't give up on your goals 💪",
        image:
          'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=800&fit=crop',
        likes: 89,
        comments: 22,
        time: '8h',
        userLiked: true,
      },
      {
        id: '7',
        userName: 'Rafael Souza',
        content:
          'Monday motivation: "Success is the sum of small efforts repeated day in and day out."',
        image:
          'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop',
        likes: 45,
        comments: 8,
        time: '12h',
        userLiked: false,
      },
      {
        id: '8',
        userName: 'Fernanda Lima',
        content: 'Weekly progress! Every workout counts 📈',
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
        likes: 52,
        comments: 11,
        time: '1d',
        userLiked: false,
      },
      {
        id: '9',
        userName: 'Lucas Alves',
        content: 'Complete cardio workout! 45 minutes of HIIT ❤️',
        image:
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
        likes: 38,
        comments: 7,
        time: '1d',
        userLiked: true,
      },
      {
        id: '10',
        userName: 'Patricia Rocha',
        content:
          "Remember: the body achieves what the mind believes. Let's go! 💪",
        image:
          'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=800&fit=crop',
        likes: 29,
        comments: 5,
        time: '2d',
        userLiked: false,
      },
    ];
  }

  static getMockChallenges(): Challenge[] {
    return [
      {
        id: '1',
        title: '30 Day Challenge',
        description: 'Complete 30 workouts in 30 days',
        participants: 156,
        endDate: '02/26/2026',
        reward: 500,
      },
      {
        id: '2',
        title: 'Weekly Run',
        description: 'Run at least 3 times this week',
        participants: 89,
        endDate: '02/02/2026',
        reward: 200,
      },
    ];
  }

  static getMockRanking(userName: string, userPoints: number): RankingUser[] {
    return [
      { position: 1, name: 'John Smith', points: 1250 },
      { position: 2, name: 'Mary Santos', points: 1180 },
      { position: 3, name: 'Peter Costa', points: 1050 },
      { position: 4, name: userName, points: userPoints },
    ];
  }
}
