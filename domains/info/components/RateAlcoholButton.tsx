import { AlcoholButton, RateButton } from '@/shared/components';
import { Colors, Layout, Typography } from '@/shared/constants';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const QuestionText = () => (
  <Text style={styles.questionText}>취향에 얼마나 맞았나요?</Text>
);

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
}

const ActionButtons = ({ onCancel, onSave }: ActionButtonsProps) => (
  <View style={styles.actionButtons}>
    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
      <Text style={styles.cancelText}>취소</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
      <Text style={styles.saveText}>저장하기</Text>
    </TouchableOpacity>
  </View>
);

interface RatingModeContentProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onCancel: () => void;
  onSave: () => void;
}

const RatingModeContent = ({ rating, onRatingChange, onCancel, onSave }: RatingModeContentProps) => (
  <View style={styles.ratingContainer}>
    <QuestionText />
    <RateButton rating={rating} onRatingChange={onRatingChange} />
    <ActionButtons onCancel={onCancel} onSave={onSave} />
  </View>
);

export const RateAlcoholButton = () => {
  const [isRatingMode, setIsRatingMode] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleButtonPress = () => {
    setIsRatingMode(true);
  };

  const handleCancel = () => {
    setIsRatingMode(false);
    setSelectedRating(0);
  };

  const handleSave = () => {
    console.log(`평점: ${selectedRating}점`);
    setIsRatingMode(false);
    setSelectedRating(0);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  if (isRatingMode) {
    return (
      <RatingModeContent
        rating={selectedRating}
        onRatingChange={handleRatingChange}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    );
  }

  return <AlcoholButton title="이 전통주를 먹었어요" onPress={handleButtonPress} />;
};

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: Colors.takju,
    padding: 16,
    borderRadius: 6,
    gap: 12,
    alignItems: 'center',
  },
  questionText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Layout.SECTION_SPACING,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.yellow,
  },
});
