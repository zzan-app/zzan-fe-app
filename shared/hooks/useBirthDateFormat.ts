export const useBirthDateFormat = () => {
  const formatBirthDate = (value: string): string => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 4)}.${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6, 8)}`;
  };

  return { formatBirthDate };
};
