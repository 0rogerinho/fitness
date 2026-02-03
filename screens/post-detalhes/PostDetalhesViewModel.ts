// ViewModel - Lógica de apresentação e estado para Post Detalhes
import { useAuth } from '@/shared/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { PerfilModel } from '../perfil/PerfilModel';
import {
  Comment,
  CommentReply,
  PostDetalhesModel,
  PostWithComments,
} from './PostDetalhesModel';

export function usePostDetalhesViewModel() {
  const params = useLocalSearchParams<{ postId?: string; userName?: string }>();
  const router = useRouter();
  const { user, updatePoints } = useAuth();
  const userNameFromParams = params.userName;
  const displayUserName = userNameFromParams || user?.name || 'Usuário';
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Obter posts: do usuário da URL (Rede Social/Perfil) ou do usuário logado
  const allPosts = PerfilModel.getMockUserPosts(displayUserName);

  // Encontrar o índice do post inicial
  const initialPostId = params.postId as string;
  const initialIndex = allPosts.findIndex((p) => p.id === initialPostId);

  // Criar posts com comentários e nome do usuário (autor do perfil ou logado)
  const [posts, setPosts] = useState<PostWithComments[]>(() => {
    return allPosts.map((post) => ({
      ...PostDetalhesModel.enrichPostWithComments(post),
      userName: displayUserName,
    }));
  });

  // Atualizar posts quando usuário da URL ou logado mudar
  useEffect(() => {
    const userName = userNameFromParams || user?.name || 'Usuário';
    const nextPosts = PerfilModel.getMockUserPosts(userName);
    setPosts(
      nextPosts.map((post) => ({
        ...PostDetalhesModel.enrichPostWithComments(post),
        userName,
      })),
    );
  }, [user, userNameFromParams]);

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.userLiked ? post.likes - 1 : post.likes + 1,
              userLiked: !post.userLiked,
            }
          : post,
      ),
    );
    const post = posts.find((p) => p.id === postId);
    if (post && !post.userLiked) {
      updatePoints(1);
    }
  };

  const handleCommentLike = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      likes: comment.userLiked
                        ? comment.likes - 1
                        : comment.likes + 1,
                      userLiked: !comment.userLiked,
                    }
                  : comment,
              ),
            }
          : post,
      ),
    );
  };

  const handleReplyLike = (
    postId: string,
    commentId: string,
    replyId: string,
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: (comment.replies || []).map((reply) =>
                        reply.id === replyId
                          ? {
                              ...reply,
                              likes: reply.userLiked
                                ? reply.likes - 1
                                : reply.likes + 1,
                              userLiked: !reply.userLiked,
                            }
                          : reply,
                      ),
                    }
                  : comment,
              ),
            }
          : post,
      ),
    );
  };

  const handleAddComment = (postId: string) => {
    if (newComment.trim() && user) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        userName: user.name,
        content: newComment.trim(),
        time: 'Agora',
        likes: 0,
        userLiked: false,
        replies: [],
      };
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [newCommentObj, ...post.comments],
              }
            : post,
        ),
      );
      setNewComment('');
      updatePoints(2);
    }
  };

  const handleAddReply = (postId: string, commentId: string) => {
    if (replyText.trim() && user) {
      const newReply: CommentReply = {
        id: Date.now().toString(),
        userName: user.name,
        content: replyText.trim(),
        time: 'Agora',
        likes: 0,
        userLiked: false,
      };
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        replies: [...(comment.replies || []), newReply],
                      }
                    : comment,
                ),
              }
            : post,
        ),
      );
      setReplyText('');
      setReplyingTo(null);
      updatePoints(1);
    }
  };

  const openCommentsModal = (postId: string) => {
    setSelectedPostId(postId);
    setCommentsModalVisible(true);
  };

  const closeCommentsModal = () => {
    setCommentsModalVisible(false);
    setSelectedPostId(null);
    setReplyingTo(null);
    setReplyText('');
  };

  const handleEditPost = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setEditingPostId(postId);
      setEditText(post.content);
      setMenuVisible(null);
    }
  };

  const handleSaveEdit = (postId: string) => {
    if (editText.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                content: editText.trim(),
              }
            : post,
        ),
      );
      setEditingPostId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditText('');
  };

  const handleDeletePost = (postId: string) => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId),
          );
          setMenuVisible(null);
          // Se não houver mais posts, voltar
          if (posts.length === 1) {
            router.back();
          }
        },
      },
    ]);
  };

  const selectedPost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId)
    : null;
  const isPostOwner = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    return post?.userName === user?.name;
  };

  const headerTitle = userNameFromParams
    ? `Posts de ${userNameFromParams}`
    : 'Posts';

  return {
    posts,
    headerTitle,
    initialIndex: initialIndex >= 0 ? initialIndex : 0,
    newComment,
    setNewComment,
    replyText,
    setReplyText,
    replyingTo,
    setReplyingTo,
    commentsModalVisible,
    selectedPost,
    selectedPostId,
    menuVisible,
    setMenuVisible,
    editingPostId,
    editText,
    setEditText,
    handleLike,
    handleCommentLike,
    handleReplyLike,
    handleAddComment,
    handleAddReply,
    openCommentsModal,
    closeCommentsModal,
    handleEditPost,
    handleSaveEdit,
    handleCancelEdit,
    handleDeletePost,
    isPostOwner,
  };
}
