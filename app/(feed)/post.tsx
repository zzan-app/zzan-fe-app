import {
  FeedImage,
  PlaceRate,
  PlaceRateModal,
  PlaceSummary,
  RateTextInput,
  ReferredAlcohol,
  SectionTitle,
} from "@/domains/feed/components";
import { usePostViewModel } from "@/domains/feed/viewmodel";
import { CommonButton, Header } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function PostTab() {
  const {
    selectedPlace,
    placeRating,
    review,
    isPlaceSelected,
    isNextButtonEnabled,
    isRatingModalVisible,
    tempRating,
    selectedAlcohols,
    handlePlaceSelect,
    handleReviewChange,
    handleCloseRatingModal,
    handleSaveRating,
    handleTempRatingChange,
    handleBackPress,
    handleNextPress,
  } = usePostViewModel();

  return (
    <View style={styles.container}>
      <Header title="피드 작성" onBackPress={handleBackPress} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
      >
        <View style={styles.imageSection}>
          <FeedImage />
        </View>

        <View style={styles.paddedContent}>
          <View style={styles.section}>
            <SectionTitle
              title="언급된 전통주"
              count={selectedAlcohols.length}
            />
            {selectedAlcohols.length > 0 ? (
              <ReferredAlcohol alcohols={selectedAlcohols} />
            ) : (
              <CommonButton
                title="이미지를 등록하고 전통주를 추가해보세요"
                textColor={Colors.black}
                backColor={Colors.gray}
                size="S"
                disabled
              />
            )}
          </View>

          <View style={styles.section}>
            <SectionTitle title="짠-플레이스*" />
            {isPlaceSelected && selectedPlace ? (
              <>
                <PlaceRate rating={placeRating} />
                <PlaceSummary
                  name={selectedPlace.name}
                  address={selectedPlace.address}
                  feedCount={selectedPlace.feedCount}
                />
              </>
            ) : (
              <CommonButton
                title="장소 추가하기"
                textColor={Colors.black}
                backColor={Colors.gray}
                size="S"
                onPress={handlePlaceSelect}
              />
            )}
          </View>

          <View style={styles.section}>
            <SectionTitle title="후기" />
            <RateTextInput value={review} onChangeText={handleReviewChange} />
          </View>

          <CommonButton
            title="다음"
            textColor={isNextButtonEnabled ? Colors.yellow : Colors.black}
            backColor={isNextButtonEnabled ? Colors.black : Colors.gray}
            size="L"
            disabled={!isNextButtonEnabled}
            onPress={handleNextPress}
          />
        </View>
      </KeyboardAwareScrollView>

      <PlaceRateModal
        visible={isRatingModalVisible}
        selectedPlace={selectedPlace}
        tempRating={tempRating}
        onClose={handleCloseRatingModal}
        onRatingChange={handleTempRatingChange}
        onSave={handleSaveRating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingBottom: 20 },
  content: {},
  imageSection: { marginBottom: Layout.SECTION_SPACING },
  paddedContent: { paddingHorizontal: Layout.SCREEN_HORIZONTAL },
  section: { gap: Layout.ITEM_SPACING, marginBottom: 24 },
});
