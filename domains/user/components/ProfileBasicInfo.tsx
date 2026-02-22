import { ProfileBasicInfoBlock } from "./ProfileBasicInfoBlock";
import type { User } from "@/domains/user/model";
import { Colors, Typography } from "@/shared/constants";
import { useBirthDateFormat, usePhoneFormat } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileBasicInfoProps {
  user: User;
  isEditMode: boolean;
  onUserChange?: (field: keyof User, value: string) => void;
}

export const ProfileBasicInfo = ({
  user,
  isEditMode,
  onUserChange,
}: ProfileBasicInfoProps) => {
  const { formatPhone } = usePhoneFormat();
  const { formatBirthDate } = useBirthDateFormat();
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleEditIconClick = (fieldName: string) => {
    if (!isEditMode) return;
    setEditingField(editingField === fieldName ? null : fieldName);
  };

  useEffect(() => {
    if (!isEditMode) {
      setEditingField(null);
    }
  }, [isEditMode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>기본정보</Text>
      <InfoList
        user={user}
        isEditMode={isEditMode}
        editingField={editingField}
        onUserChange={onUserChange}
        onEditIconClick={handleEditIconClick}
        formatPhone={formatPhone}
        formatBirthDate={formatBirthDate}
      />
    </View>
  );
};

interface InfoListProps {
  user: User;
  isEditMode: boolean;
  editingField: string | null;
  onUserChange?: (field: keyof User, value: string) => void;
  onEditIconClick: (fieldName: string) => void;
  formatPhone: (value: string) => string;
  formatBirthDate: (value: string) => string;
}

const InfoList = ({
  user,
  isEditMode,
  editingField,
  onUserChange,
  onEditIconClick,
  formatPhone,
  formatBirthDate,
}: InfoListProps) => (
  <View style={styles.infoList}>
    <ProfileBasicInfoBlock
      label="이름"
      value={user.name}
      isFieldEditing={editingField === "name"}
      showEditIcon={isEditMode}
      onValueChange={(text) => onUserChange?.("name", text)}
      onEditIconClick={() => onEditIconClick("name")}
    />
    <ProfileBasicInfoBlock
      label="생년월일"
      value={user.birthDate}
      isFieldEditing={editingField === "birthDate"}
      showEditIcon={isEditMode}
      onValueChange={(text) =>
        onUserChange?.("birthDate", formatBirthDate(text))
      }
      onEditIconClick={() => onEditIconClick("birthDate")}
      keyboardType="numeric"
    />
    <ProfileBasicInfoBlock
      label="전화번호"
      value={user.phone}
      isFieldEditing={editingField === "phone"}
      showEditIcon={isEditMode}
      onValueChange={(text) => onUserChange?.("phone", formatPhone(text))}
      onEditIconClick={() => onEditIconClick("phone")}
      keyboardType="numeric"
    />
    <ProfileBasicInfoBlock
      label="이메일"
      value={user.email}
      isFieldEditing={editingField === "email"}
      showEditIcon={isEditMode}
      onValueChange={(text) => onUserChange?.("email", text)}
      onEditIconClick={() => onEditIconClick("email")}
      keyboardType="email-address"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 28,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 22,
    color: Colors.black,
    letterSpacing: -0.44,
  },
  infoList: {
    gap: 24,
  },
});
