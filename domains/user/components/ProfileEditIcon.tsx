import { Colors } from '@/shared/constants';
import { StyleSheet, View } from 'react-native';
import EditIcon from '@/assets/icons/edit.svg';

export const ProfileEditIcon = () => {
  return (
    <View style={styles.container}>
      <EditIcon width={12} height={12} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 28,
    height: 28,
    backgroundColor: Colors.yellow,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
