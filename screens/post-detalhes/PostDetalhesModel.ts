// Model - Tipos e interfaces para Post Detalhes
import { UserPost } from '../perfil/PerfilModel';

export interface CommentReply {
  id: string;
  userName: string;
  content: string;
  time: string;
  likes: number;
  userLiked: boolean;
}

export interface Comment {
  id: string;
  userName: string;
  content: string;
  time: string;
  likes: number;
  userLiked: boolean;
  replies?: CommentReply[];
}

export interface PostWithComments extends UserPost {
  comments: Comment[];
  userLiked: boolean;
  userName: string;
}

export class PostDetalhesModel {
  static getMockComments(postId: string): Comment[] {
    return [
      {
        id: '1',
        userName: 'João Silva',
        content: 'Parabéns pelo progresso! 🔥',
        time: '1h',
        likes: 5,
        userLiked: false,
        replies: [
          {
            id: '1-1',
            userName: 'Você',
            content: 'Obrigado! 💪',
            time: '30m',
            likes: 2,
            userLiked: false,
          },
        ],
      },
      {
        id: '2',
        userName: 'Maria Santos',
        content: 'Inspirador! Continue assim 💪',
        time: '2h',
        likes: 3,
        userLiked: true,
        replies: [],
      },
      {
        id: '3',
        userName: 'Pedro Costa',
        content: 'Que treino incrível!',
        time: '3h',
        likes: 2,
        userLiked: false,
        replies: [],
      },
    ];
  }

  static enrichPostWithComments(post: UserPost): PostWithComments {
    return {
      ...post,
      comments: PostDetalhesModel.getMockComments(post.id),
      userLiked: false,
      userName: '',
    };
  }
}
