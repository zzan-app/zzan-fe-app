export interface TextSegment {
  text: string;
  isBold: boolean;
}

export const parseMessageText = (content: string): TextSegment[] => {
  let cleanedText = content.replace(/\[ITEM:\s*[^\]]*\]/g, '');

  const segments: TextSegment[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(cleanedText)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: cleanedText.substring(lastIndex, match.index),
        isBold: false
      });
    }

    segments.push({
      text: match[1],
      isBold: true
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < cleanedText.length) {
    segments.push({
      text: cleanedText.substring(lastIndex),
      isBold: false
    });
  }

  return segments;
};
