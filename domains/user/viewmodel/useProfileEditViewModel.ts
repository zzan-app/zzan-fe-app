import { feedApi } from "@/domains/feed/api/feedApi";
import { userApi } from "@/domains/user/api";
import { mapUserToApiRequest } from "@/domains/user/mapper";
import type { User } from "@/domains/user/model";
import { isMockEnabled } from "@/shared/utils";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

export const useProfileEditViewModel = (
  initialUser: User | null,
  onSaveSuccess?: () => void,
) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(initialUser);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setEditedUser(initialUser);
  }, [initialUser]);

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const hideToast = () => {
    setShowToast(false);
    setToastMessage(null);
  };

  const saveUser = async (): Promise<boolean> => {
    if (!editedUser) return false;

    if (isMockEnabled()) {
      return true;
    }

    setIsSaving(true);
    try {
      const requestBody = mapUserToApiRequest(editedUser);
      console.log("[ProfileEdit] PUT /users/me 요청 데이터:", requestBody);

      await userApi.updateProfile(requestBody);

      console.log("[ProfileEdit] PUT /users/me 성공");
      return true;
    } catch (err: any) {
      console.error("[ProfileEdit] PUT /users/me 실패:", err);

      let errorMessage = "프로필 수정에 실패했습니다.";

      if (err?.message) {
        try {
          const parsed = JSON.parse(err.message);
          errorMessage = parsed.message || errorMessage;
        } catch {
          errorMessage = err.message;
        }
      }

      showErrorToast(errorMessage);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEditMode = async () => {
    if (isEditMode) {
      const success = await saveUser();
      if (success && onSaveSuccess) {
        onSaveSuccess();
      }
    }
    setIsEditMode(!isEditMode);
  };

  const updateUserField = (field: keyof User, value: string) => {
    setEditedUser((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (result.canceled) return;

    const localUri = result.assets[0].uri;

    if (isMockEnabled()) {
      setEditedUser((prev) => {
        if (!prev) return prev;
        return { ...prev, profileImage: { uri: localUri } };
      });
      return;
    }

    setIsUploadingImage(true);
    try {
      const fileName = localUri.split("/").pop() || `profile_${Date.now()}.jpg`;

      const presigned = await feedApi.getPresignedUrl(
        { fileName } as any,
        "user-profile-images",
      );

      const imageBlob = await fetch(localUri).then((r) => r.blob());
      await feedApi.uploadImageToS3(presigned.url, imageBlob);

      setEditedUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          profileImage: { uri: localUri },
          profileImageUrl: presigned.key,
        };
      });

      console.log("[ProfileEdit] 프로필 이미지 업로드 성공:", presigned.key);
    } catch (err) {
      console.error("[ProfileEdit] 프로필 이미지 업로드 실패:", err);
      showErrorToast("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const cancelEdit = () => {
    setEditedUser(initialUser);
    setIsEditMode(false);
  };

  return {
    isEditMode,
    editedUser,
    isSaving,
    isUploadingImage,
    toastMessage,
    showToast,
    toggleEditMode,
    updateUserField,
    selectProfileImage,
    cancelEdit,
    hideToast,
  };
};
