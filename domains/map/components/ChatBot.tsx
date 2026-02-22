import ChatBotIcon from '@/assets/icons/chatbot.svg';
import { Colors } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const ChatBot = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/(chat)/chat');
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <ChatBotIcon width={40} height={40} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 31,
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
  },
  iconWrapper: {
    transform: [{ translateY: -6 }], 
  },
});