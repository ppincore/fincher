import { useEffect, useState } from 'react';

export const BugButton = () => {
  const text = 'Throw Error';
  const [error, setError] = useState(false);
  const onThrow = () => setError(true);
  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return (
    <button type="button" onClick={onThrow}>
      {text}
    </button>
  );
};

BugButton.displayName = 'BugButton';
