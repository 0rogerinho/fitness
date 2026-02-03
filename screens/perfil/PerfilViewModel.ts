// ViewModel - Presentation logic and state for Profile
import { useAuth } from '@/shared/contexts/AuthContext';
import { useState } from 'react';
import { PerfilModel } from './PerfilModel';

export function usePerfilViewModel() {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'posts' | 'treinos'>('posts');
  const [beforeImage, setBeforeImage] = useState<string | undefined>(undefined);
  const [afterImage, setAfterImage] = useState<string | undefined>(undefined);

  if (!user) {
    return {
      profile: null,
      posts: [],
      workoutStats: [],
      selectedTab: 'posts',
      setSelectedTab: () => {},
      beforeImage: undefined,
      afterImage: undefined,
      setBeforeImage: () => {},
      setAfterImage: () => {},
      logout: () => {},
    };
  }

  const profile = PerfilModel.getMockUserProfile(
    user.id,
    user.name,
    user.points,
  );
  const posts = PerfilModel.getMockUserPosts(user.name);
  const workoutStats = PerfilModel.getMockWorkoutStats();

  // Merge state images with profile
  const profileWithImages = {
    ...profile,
    beforeImage: beforeImage || profile.beforeImage,
    afterImage: afterImage || profile.afterImage,
  };

  return {
    profile: profileWithImages,
    posts,
    workoutStats,
    selectedTab,
    setSelectedTab,
    beforeImage: beforeImage || profile.beforeImage,
    afterImage: afterImage || profile.afterImage,
    setBeforeImage,
    setAfterImage,
    logout,
  };
}
