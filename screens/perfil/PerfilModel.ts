// Model - Types and interfaces for Profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  beforeImage?: string;
  afterImage?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    workoutsCompleted: number;
    currentStreak: number;
    totalPoints: number;
    rankingPosition: number;
  };
}

export interface UserPost {
  id: string;
  image?: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
}

export interface WorkoutStat {
  id: string;
  type: string;
  date: string;
  duration: number; // minutes
  points: number;
}

export class PerfilModel {
  static getMockUserProfile(
    userId: string,
    userName: string,
    userPoints: number,
  ): UserProfile {
    return {
      id: userId,
      name: userName,
      email: `${userName.toLowerCase().replace(' ', '.')}@fitness.com`,
      profileImage: undefined, // Can be an image URL
      bio: 'Passionate about fitness and healthy living 💪 | Training every day to be the best version of myself!',
      beforeImage: undefined, // Photo before starting to train
      afterImage: undefined, // Photo after starting to train
      stats: {
        posts: 24,
        followers: 156,
        following: 89,
        workoutsCompleted: 42,
        currentStreak: 7,
        totalPoints: userPoints,
        rankingPosition: 4,
      },
    };
  }

  static getMockUserPosts(userName: string): UserPost[] {
    return [
      {
        id: '1',
        image:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        content: 'Complete hypertrophy workout! 💪',
        likes: 24,
        comments: 5,
        time: '2h',
      },
      {
        id: '2',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        content: 'Morning 5km run 🏃‍♂️',
        likes: 18,
        comments: 3,
        time: '1d',
      },
      {
        id: '3',
        image:
          'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
        content: 'New personal record! 🎯',
        likes: 32,
        comments: 8,
        time: '3d',
      },
      {
        id: '4',
        image:
          'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop',
        content: 'Intense leg workout! 🔥',
        likes: 15,
        comments: 2,
        time: '5d',
      },
      {
        id: '5',
        image:
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
        content: 'Active rest day 🧘',
        likes: 12,
        comments: 1,
        time: '1w',
      },
      {
        id: '6',
        image:
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        content: 'Complete cardio workout! ❤️',
        likes: 28,
        comments: 6,
        time: '1w',
      },
      {
        id: '7',
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        content: 'Weekly progress! 📈',
        likes: 35,
        comments: 9,
        time: '2w',
      },
      {
        id: '8',
        image:
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
        content: 'Arm workout! 💪',
        likes: 20,
        comments: 4,
        time: '2w',
      },
      {
        id: '9',
        image:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        content: 'Another workout day! 🔥',
        likes: 19,
        comments: 3,
        time: '3w',
      },
    ];
  }

  static getMockWorkoutStats(): WorkoutStat[] {
    return [
      {
        id: '1',
        type: 'Hypertrophy',
        date: 'Today',
        duration: 60,
        points: 50,
      },
      {
        id: '2',
        type: '5km Run',
        date: 'Yesterday',
        duration: 30,
        points: 40,
      },
      {
        id: '3',
        type: 'Weight Loss',
        date: '2 days ago',
        duration: 45,
        points: 35,
      },
      {
        id: '4',
        type: 'Hypertrophy',
        date: '3 days ago',
        duration: 60,
        points: 50,
      },
      {
        id: '5',
        type: '10km Run',
        date: '4 days ago',
        duration: 50,
        points: 60,
      },
    ];
  }
}
