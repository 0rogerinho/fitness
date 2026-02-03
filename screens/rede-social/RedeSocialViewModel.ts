// ViewModel - Presentation logic and state for Social Network
import { useAuth } from '@/shared/contexts/AuthContext';
import { useState } from 'react';
import { Post, RedeSocialModel } from './RedeSocialModel';

export function useRedeSocialViewModel() {
  const { user, updatePoints } = useAuth();
  const [posts, setPosts] = useState<Post[]>(RedeSocialModel.getMockPosts());

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newLiked = !post.userLiked;
          return {
            ...post,
            userLiked: newLiked,
            likes: newLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      }),
    );
    updatePoints(1);
  };

  return {
    posts,
    handleLike,
  };
}
