import { useCallback, useState } from "react";

export const useModal = () => {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const toggleModal = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return {
    visible,
    openModal,
    closeModal,
    toggleModal,
  };
};
