export const useFormatTime = () => {
  /**
   * 타임스탬프를 '11:42' 또는 '23:42' 형식으로 변환합니다.
   * @param timestamp 밀리초 단위 숫자
   */
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    
    // Intl.DateTimeFormat을 사용하면 지역 설정에 맞는 포맷팅이 쉽습니다.
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 오전/오후 표시를 원하면 true로 변경하세요
    }).format(date);
  };

  /**
   * (선택) 날짜까지 포함하고 싶을 때 사용
   */
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return { formatTime, formatDate };
};