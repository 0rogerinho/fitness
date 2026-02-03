// View - UI component for Instagram-style Social Network
import { PostCard } from '@/components/post-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRedeSocialViewModel } from './RedeSocialViewModel';

export default function RedeSocialScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { posts, handleLike } = useRedeSocialViewModel();

  const handleCommentPress = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      router.push({
        pathname: '/post-detalhes',
        params: { postId, userName: post.userName },
      } as any);
    }
  };
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.cardBorder,
            paddingTop: Platform.select({
              ios: insets.top,
              android: insets.top,
              default: insets.top,
            }),
          },
        ]}
      >
        <ThemedText type="title" style={styles.headerTitle}>
          Social Network
        </ThemedText>
        <TouchableOpacity activeOpacity={0.7}>
          <IconSymbol size={24} name="paperplane" color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Post Feed */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onCommentPress={handleCommentPress}
            showDate={true}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
});
