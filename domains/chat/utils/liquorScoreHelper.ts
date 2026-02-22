import Constants from 'expo-constants';

export interface LiquorDetail {
  id: string;
  score?: number;
}

const getBaseUrl = (): string => {
  return Constants.expoConfig?.extra?.apiUrl || '';
};

export const fetchLiquorScore = async (liquorId: string): Promise<number | null> => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/liquors/${liquorId}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data?.score ?? null;
  } catch (error) {
    console.error(`[Liquor Score Error] ${liquorId}:`, error);
    return null;
  }
};
