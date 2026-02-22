import Constants from 'expo-constants';

export const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

export const getApiUrl = (): string => {
  return Constants.expoConfig?.extra?.apiUrl || '';
};
