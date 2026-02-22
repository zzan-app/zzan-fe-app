import TargetIcon from '@/assets/icons/target.svg';
import { Colors } from '@/shared/constants';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface CurrentPositionProps {
  onPress: () => void;
}

export const CurrentPosition = ({ onPress }: CurrentPositionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TargetIcon width={22} height={22} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
