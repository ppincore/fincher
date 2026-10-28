import { useCallback, useState } from 'react';

export function useModal() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const showModal = useCallback(() => setIsModalOpened(true), []);
  const closeModal = useCallback(() => setIsModalOpened(false), []);

  return {
    isModalOpened,
    showModal,
    closeModal,
  };
}
