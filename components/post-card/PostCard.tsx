// Componente compartilhado para exibir posts
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Interface base para o post
export interface BasePost {
  id: string;
  userName: string;
  content: string;
  image?: string;
  likes: number;
  comments: number | any[]; // Pode ser número ou array de comentários
  time: string;
  userLiked: boolean;
}

export interface PostCardProps {
  post: BasePost;
  onLike?: (postId: string) => void;
  onCommentPress?: (postId: string) => void;
  onMorePress?: (postId: string) => void;
  /** Ao tocar no card (ex.: abrir detalhes do post ou posts do perfil) */
  onPress?: (postId: string) => void;
  formatTime?: (time: string) => string;
  showEditMenu?: boolean;
  isEditing?: boolean;
  editText?: string;
  onEditTextChange?: (text: string) => void;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  showCommentsPreview?: boolean;
  commentsPreview?: Array<{ id: string; userName: string; content: string }>;
  showDate?: boolean;
  showMenu?: boolean;
  menuItems?: Array<{
    label: string;
    icon: string;
    onPress: () => void;
    color?: string;
  }>;
  showViewComments?: boolean;
  onViewCommentsPress?: () => void;
}

// Função padrão para formatar data relativa
const defaultFormatRelativeTime = (time: string): string => {
  const timeLower = time.toLowerCase().trim();
  const regex = /\d+/;
  const match = regex.exec(timeLower);
  if (!match) return time;

  const value = Number.parseInt(match[0], 10);

  if (timeLower.includes('h')) {
    if (value === 1) return 'há 1 hora';
    if (value < 24) return `há ${value} horas`;
    const days = Math.floor(value / 24);
    return days === 1 ? 'há 1 dia' : `há ${days} dias`;
  }

  if (timeLower.includes('d')) {
    if (value === 1) return 'há 1 dia';
    if (value < 7) return `há ${value} dias`;
    if (value < 30) {
      const weeks = Math.floor(value / 7);
      return weeks === 1 ? 'há 1 semana' : `há ${weeks} semanas`;
    }
    if (value < 365) {
      const months = Math.floor(value / 30);
      return months === 1 ? 'há 1 mês' : `há ${months} meses`;
    }
    const years = Math.floor(value / 365);
    return years === 1 ? 'há 1 ano' : `há ${years} anos`;
  }

  if (timeLower.includes('sem')) {
    return value === 1 ? 'há 1 semana' : `há ${value} semanas`;
  }

  if (timeLower.includes('mês') || timeLower.includes('mes')) {
    return value === 1 ? 'há 1 mês' : `há ${value} meses`;
  }

  return time;
};

export function PostCard({
  post,
  onLike,
  onCommentPress,
  onMorePress,
  onPress,
  formatTime = defaultFormatRelativeTime,
  showEditMenu = false,
  isEditing = false,
  editText = '',
  onEditTextChange,
  onSaveEdit,
  onCancelEdit,
  showCommentsPreview = false,
  commentsPreview = [],
  showDate = true,
  showMenu = false,
  menuItems = [],
  showViewComments = false,
  onViewCommentsPress,
}: PostCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [imageError, setImageError] = React.useState(false);

  // Reset error state quando a URI da imagem mudar
  const imageUri = post.image;
  React.useEffect(() => {
    setImageError(false);
  }, [imageUri]);

  const commentsCount = Array.isArray(post.comments)
    ? post.comments.length
    : post.comments;

  const cardContent = (
    <>
      {/* Header do Post */}
      <View style={styles.postHeader}>
        <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
          <ThemedText style={styles.avatarText}>
            {post.userName.charAt(0).toUpperCase()}
          </ThemedText>
        </View>
        <View style={styles.postHeaderInfo}>
          <ThemedText type="defaultSemiBold" style={styles.postUserName}>
            {post.userName}
          </ThemedText>
        </View>
        {onMorePress && (
          <TouchableOpacity
            onPress={() => onMorePress(post.id)}
            activeOpacity={0.7}
          >
            <IconSymbol size={20} name="ellipsis" color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Menu de Opções */}
      {showMenu && menuItems.length > 0 && (
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <View
                  style={[
                    styles.menuDivider,
                    { backgroundColor: colors.cardBorder },
                  ]}
                />
              )}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <IconSymbol
                  size={20}
                  name={item.icon as any}
                  color={item.color || colors.text}
                />
                <ThemedText
                  style={[
                    styles.menuItemText,
                    item.color && { color: item.color },
                  ]}
                >
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      )}

      {/* Imagem do Post (se houver e não falhou ao carregar) */}
      {post.image && !imageError ? (
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          style={[
            styles.postImagePlaceholder,
            { backgroundColor: colors.cardBorder },
          ]}
        >
          <IconSymbol size={80} name="photo" color={colors.icon} />
        </View>
      )}

      {/* Ações do Post */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity
            style={styles.postActionButton}
            onPress={() => onLike?.(post.id)}
            activeOpacity={0.7}
          >
            <IconSymbol
              size={24}
              name={post.userLiked ? 'heart.fill' : 'heart'}
              color={post.userLiked ? '#FF3040' : colors.text}
            />
            <ThemedText
              style={[
                styles.postActionText,
                post.userLiked && { color: '#FF3040' },
              ]}
            >
              {post.likes}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postActionButton}
            onPress={() => onCommentPress?.(post.id)}
            activeOpacity={0.7}
          >
            <IconSymbol size={24} name="bubble.left" color={colors.text} />
            <ThemedText style={styles.postActionText}>
              {commentsCount}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo do Post */}
      <View style={styles.postContentContainer}>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={[
                styles.editInput,
                { color: colors.text, borderColor: colors.cardBorder },
              ]}
              value={editText}
              onChangeText={onEditTextChange}
              multiline
              autoFocus
            />
            <View style={styles.editActions}>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  { backgroundColor: colors.cardBorder },
                ]}
                onPress={onCancelEdit}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.editButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: colors.tint }]}
                onPress={onSaveEdit}
                activeOpacity={0.7}
              >
                <ThemedText
                  style={[styles.editButtonText, { color: '#FFFFFF' }]}
                >
                  Save
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ThemedText style={styles.postContent}>
            <ThemedText type="defaultSemiBold">{post.userName} </ThemedText>
            {post.content}
          </ThemedText>
        )}
      </View>

      {/* Data do Post */}
      {showDate && (
        <View style={styles.postDateContainer}>
          <ThemedText style={styles.postDateText}>
            {formatTime(post.time)}
          </ThemedText>
        </View>
      )}

      {/* Ver comentários */}
      {showViewComments && commentsCount > 0 && (
        <TouchableOpacity
          style={styles.viewCommentsButton}
          onPress={onViewCommentsPress}
          activeOpacity={0.7}
        >
          <ThemedText style={[styles.viewCommentsText, { opacity: 0.6 }]}>
            Ver todos os {commentsCount}{' '}
            {commentsCount === 1 ? 'comentário' : 'comentários'}
          </ThemedText>
        </TouchableOpacity>
      )}

      {/* Preview de Comentários */}
      {showCommentsPreview && commentsPreview.length > 0 && (
        <View style={styles.commentsPreview}>
          {commentsPreview.slice(0, 2).map((comment) => (
            <View key={comment.id} style={styles.commentPreviewItem}>
              <ThemedText style={styles.commentPreviewText}>
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.commentPreviewUserName}
                >
                  {comment.userName}{' '}
                </ThemedText>
                {comment.content}
              </ThemedText>
            </View>
          ))}
        </View>
      )}

      {/* Separador */}
      <View
        style={[styles.postSeparator, { borderBottomColor: colors.cardBorder }]}
      />
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.postContainer, { backgroundColor: colors.background }]}
        onPress={() => onPress(post.id)}
        activeOpacity={1}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[styles.postContainer, { backgroundColor: colors.background }]}
    >
      {cardContent}
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  postHeaderInfo: {
    flex: 1,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: '600',
  },
  postImage: {
    width: width,
    height: width,
    backgroundColor: '#f0f0f0',
  },
  postImagePlaceholder: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postActionsLeft: {
    flexDirection: 'row',
    gap: 20,
  },
  postActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 4,
  },
  postActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  postContentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  postDateContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  postDateText: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  editContainer: {
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    marginBottom: 8,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentsPreview: {
    paddingHorizontal: 12,
    gap: 4,
  },
  commentPreviewItem: {
    marginBottom: 2,
  },
  commentPreviewText: {
    fontSize: 14,
    lineHeight: 18,
  },
  commentPreviewUserName: {
    fontSize: 14,
    fontWeight: '600',
  },
  postSeparator: {
    borderBottomWidth: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  menuContainer: {
    marginHorizontal: 12,
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    marginHorizontal: 16,
  },
  viewCommentsButton: {
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  viewCommentsText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
