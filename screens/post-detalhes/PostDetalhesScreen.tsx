// View - Feed de Posts estilo Instagram
import { PostCard } from '@/components/post-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePostDetalhesViewModel } from './PostDetalhesViewModel';

const { width } = Dimensions.get('window');

export default function PostDetalhesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const {
    posts,
    initialIndex,
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
    headerTitle,
  } = usePostDetalhesViewModel();

  const userName = user?.name || 'Usuário';
  const userInitial = userName.charAt(0).toUpperCase();
  const scrollViewRef = useRef<ScrollView>(null);

  React.useEffect(() => {
    // Scroll para o post inicial após um pequeno delay
    // Como não sabemos a altura exata, vamos apenas garantir que está no topo
    // O usuário pode rolar normalmente
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 100);
    }
  }, []);

  const renderPost = (post: (typeof posts)[0], index: number) => {
    const isEditing = editingPostId === post.id;
    const showMenu = menuVisible === post.id;
    const isOwner = isPostOwner(post.id);

    const menuItems = isOwner
      ? [
          {
            label: 'Edit',
            icon: 'pencil',
            onPress: () => handleEditPost(post.id),
            color: colors.text,
          },
          {
            label: 'Delete',
            icon: 'trash',
            onPress: () => handleDeletePost(post.id),
            color: '#FF3B30',
          },
        ]
      : [];

    return (
      <PostCard
        key={post.id}
        post={{
          ...post,
          comments: post.comments.length,
        }}
        onLike={handleLike}
        onCommentPress={() => openCommentsModal(post.id)}
        onMorePress={
          isOwner ? () => setMenuVisible(showMenu ? null : post.id) : undefined
        }
        isEditing={isEditing}
        editText={editText}
        onEditTextChange={setEditText}
        onSaveEdit={() => handleSaveEdit(post.id)}
        onCancelEdit={handleCancelEdit}
        showMenu={showMenu && isOwner}
        menuItems={menuItems}
        showCommentsPreview={post.comments.length > 0}
        commentsPreview={post.comments.slice(0, 2).map((c) => ({
          id: c.id,
          userName: c.userName,
          content: c.content,
        }))}
        showViewComments={post.comments.length > 0}
        onViewCommentsPress={() => openCommentsModal(post.id)}
        showDate={false}
      />
    );
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header Fixo */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.background,
              paddingTop: Platform.select({
                ios: insets.top,
                android: insets.top,
                default: insets.top,
              }),
              borderBottomColor: colors.cardBorder,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol size={24} name="chevron.left" color={colors.text} />
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            {headerTitle}
          </ThemedText>
          <View style={styles.headerRight} />
        </View>

        {/* Feed de Posts */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.feed}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {posts.map((post, index) => renderPost(post, index))}
        </ScrollView>

        {/* Modal de Comentários */}
        <Modal
          visible={commentsModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={closeCommentsModal}
        >
          <ThemedView
            style={[
              styles.modalContainer,
              { backgroundColor: colors.background },
            ]}
          >
            {/* Header do Modal */}
            <View
              style={[
                styles.modalHeader,
                {
                  backgroundColor: colors.background,
                  paddingTop: Platform.select({
                    ios: insets.top,
                    android: insets.top,
                    default: insets.top,
                  }),
                  borderBottomColor: colors.cardBorder,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={closeCommentsModal}
                activeOpacity={0.7}
              >
                <IconSymbol size={24} name="chevron.left" color={colors.text} />
              </TouchableOpacity>
              <ThemedText type="subtitle" style={styles.modalHeaderTitle}>
                Comentários
              </ThemedText>
              <View style={styles.modalHeaderRight} />
            </View>

            {/* Lista de Comentários */}
            <ScrollView
              style={styles.modalCommentsList}
              contentContainerStyle={styles.modalCommentsContent}
            >
              {selectedPost?.comments.map((comment) => (
                <View key={comment.id} style={styles.modalCommentItem}>
                  <View
                    style={[
                      styles.modalCommentAvatar,
                      { backgroundColor: colors.tint },
                    ]}
                  >
                    <ThemedText style={styles.modalCommentAvatarText}>
                      {comment.userName.charAt(0).toUpperCase()}
                    </ThemedText>
                  </View>
                  <View style={styles.modalCommentContent}>
                    <View
                      style={[
                        styles.modalCommentBubble,
                        { backgroundColor: colors.card },
                      ]}
                    >
                      <ThemedText
                        type="defaultSemiBold"
                        style={styles.modalCommentUserName}
                      >
                        {comment.userName}
                      </ThemedText>
                      <ThemedText style={styles.modalCommentText}>
                        {comment.content}
                      </ThemedText>
                    </View>
                    <View style={styles.modalCommentActions}>
                      <ThemedText
                        style={[styles.modalCommentTime, { opacity: 0.6 }]}
                      >
                        {comment.time}
                      </ThemedText>
                      {comment.likes > 0 && (
                        <ThemedText
                          style={[styles.modalCommentLikes, { opacity: 0.6 }]}
                        >
                          {comment.likes}{' '}
                          {comment.likes === 1 ? 'curtida' : 'curtidas'}
                        </ThemedText>
                      )}
                      <TouchableOpacity
                        style={styles.modalCommentLikeButton}
                        onPress={() =>
                          selectedPostId &&
                          handleCommentLike(selectedPostId, comment.id)
                        }
                        activeOpacity={0.7}
                      >
                        <IconSymbol
                          size={14}
                          name={comment.userLiked ? 'heart.fill' : 'heart'}
                          color={comment.userLiked ? '#FF3040' : 'transparent'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalCommentReplyButton}
                        onPress={() =>
                          setReplyingTo(
                            replyingTo === comment.id ? null : comment.id,
                          )
                        }
                        activeOpacity={0.7}
                      >
                        <ThemedText
                          style={[
                            styles.modalCommentReplyText,
                            { opacity: 0.6 },
                          ]}
                        >
                          Responder
                        </ThemedText>
                      </TouchableOpacity>
                    </View>

                    {/* Respostas */}
                    {comment.replies && comment.replies.length > 0 && (
                      <View style={styles.repliesContainer}>
                        {comment.replies.map((reply) => (
                          <View key={reply.id} style={styles.replyItem}>
                            <View
                              style={[
                                styles.replyAvatar,
                                { backgroundColor: colors.tint },
                              ]}
                            >
                              <ThemedText style={styles.replyAvatarText}>
                                {reply.userName.charAt(0).toUpperCase()}
                              </ThemedText>
                            </View>
                            <View
                              style={[
                                styles.replyBubble,
                                { backgroundColor: colors.card },
                              ]}
                            >
                              <ThemedText
                                type="defaultSemiBold"
                                style={styles.replyUserName}
                              >
                                {reply.userName}
                              </ThemedText>
                              <ThemedText style={styles.replyText}>
                                {reply.content}
                              </ThemedText>
                              <View style={styles.replyActions}>
                                <ThemedText
                                  style={[styles.replyTime, { opacity: 0.6 }]}
                                >
                                  {reply.time}
                                </ThemedText>
                                {reply.likes > 0 && (
                                  <ThemedText
                                    style={[
                                      styles.replyLikes,
                                      { opacity: 0.6 },
                                    ]}
                                  >
                                    {reply.likes}{' '}
                                    {reply.likes === 1 ? 'curtida' : 'curtidas'}
                                  </ThemedText>
                                )}
                                <TouchableOpacity
                                  style={styles.replyLikeButton}
                                  onPress={() =>
                                    selectedPostId &&
                                    handleReplyLike(
                                      selectedPostId,
                                      comment.id,
                                      reply.id,
                                    )
                                  }
                                  activeOpacity={0.7}
                                >
                                  <IconSymbol
                                    size={14}
                                    name={
                                      reply.userLiked ? 'heart.fill' : 'heart'
                                    }
                                    color={
                                      reply.userLiked
                                        ? '#FF3040'
                                        : 'transparent'
                                    }
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Input de Resposta */}
                    {replyingTo === comment.id && (
                      <View style={styles.replyInputContainer}>
                        <View
                          style={[
                            styles.replyInputWrapper,
                            { borderColor: colors.cardBorder },
                          ]}
                        >
                          <TextInput
                            style={[styles.replyInput, { color: colors.text }]}
                            placeholder={`Responder ${comment.userName}...`}
                            placeholderTextColor={colors.icon}
                            value={replyText}
                            onChangeText={setReplyText}
                            multiline
                            autoFocus
                          />
                          <TouchableOpacity
                            style={[
                              styles.replySendButton,
                              { opacity: replyText.trim() ? 1 : 0.5 },
                            ]}
                            onPress={() =>
                              selectedPostId &&
                              handleAddReply(selectedPostId, comment.id)
                            }
                            disabled={!replyText.trim()}
                            activeOpacity={0.7}
                          >
                            <ThemedText
                              style={[
                                styles.replySendButtonText,
                                {
                                  color: replyText.trim()
                                    ? colors.tint
                                    : colors.icon,
                                },
                              ]}
                            >
                              Send
                            </ThemedText>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Input de Comentário no Modal */}
            <View
              style={[
                styles.modalCommentInputContainer,
                {
                  backgroundColor: colors.background,
                  borderTopColor: colors.cardBorder,
                  paddingBottom: Platform.select({
                    ios: insets.bottom,
                    android: insets.bottom,
                    default: insets.bottom,
                  }),
                },
              ]}
            >
              <View style={styles.modalCommentInputRow}>
                <View
                  style={[
                    styles.modalCommentAvatarSmall,
                    { backgroundColor: colors.tint },
                  ]}
                >
                  <ThemedText style={styles.modalCommentAvatarSmallText}>
                    {userInitial}
                  </ThemedText>
                </View>
                <TextInput
                  style={[styles.modalCommentInput, { color: colors.text }]}
                  placeholder="Add a comment..."
                  placeholderTextColor={colors.icon}
                  value={newComment}
                  onChangeText={setNewComment}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity
                  style={[
                    styles.modalSendButton,
                    { opacity: newComment.trim() ? 1 : 0.5 },
                  ]}
                  onPress={() =>
                    selectedPostId && handleAddComment(selectedPostId)
                  }
                  disabled={!newComment.trim()}
                  activeOpacity={0.7}
                >
                  <ThemedText
                    style={[
                      styles.modalSendButtonText,
                      { color: newComment.trim() ? colors.tint : colors.icon },
                    ]}
                  >
                    Publicar
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>
        </Modal>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  feed: {
    flex: 1,
    marginTop: 60,
  },
  postContainer: {
    width: width,
    paddingBottom: 20,
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  postHeaderUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  postHeaderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postHeaderAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  postHeaderUserName: {
    fontSize: 14,
    fontWeight: '600',
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  postImageContainer: {
    width: '100%',
    height: width,
    backgroundColor: '#000',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  captionSection: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  captionUserName: {
    fontSize: 14,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'uppercase',
    marginTop: 4,
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
  viewCommentsButton: {
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  viewCommentsText: {
    fontSize: 14,
    fontWeight: '400',
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
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  modalHeaderRight: {
    width: 40,
  },
  modalCommentsList: {
    flex: 1,
  },
  modalCommentsContent: {
    padding: 12,
    paddingBottom: 20,
  },
  modalCommentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  modalCommentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCommentAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  modalCommentContent: {
    flex: 1,
  },
  modalCommentBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  modalCommentUserName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalCommentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalCommentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 12,
    marginTop: 4,
  },
  modalCommentTime: {
    fontSize: 12,
    fontWeight: '400',
  },
  modalCommentLikes: {
    fontSize: 12,
    fontWeight: '400',
  },
  modalCommentLikeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCommentReplyButton: {
    paddingHorizontal: 4,
  },
  modalCommentReplyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  repliesContainer: {
    marginLeft: 48,
    marginTop: 8,
    gap: 8,
  },
  replyItem: {
    flexDirection: 'row',
    gap: 8,
  },
  replyAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  replyBubble: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
  },
  replyUserName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  replyText: {
    fontSize: 13,
    lineHeight: 18,
  },
  replyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  replyTime: {
    fontSize: 11,
    fontWeight: '400',
  },
  replyLikes: {
    fontSize: 11,
    fontWeight: '400',
  },
  replyLikeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyInputContainer: {
    marginLeft: 48,
    marginTop: 8,
  },
  replyInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  replyInput: {
    flex: 1,
    fontSize: 13,
    maxHeight: 60,
  },
  replySendButton: {
    paddingHorizontal: 8,
  },
  replySendButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalCommentInputContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  modalCommentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  modalCommentAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCommentAvatarSmallText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  modalCommentInput: {
    flex: 1,
    fontSize: 14,
    maxHeight: 80,
    paddingVertical: 4,
  },
  modalSendButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  modalSendButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
