import { useState, useEffect } from 'react';
import Loading from './Loading';

// eslint-disable-next-line react/prop-types
const LoadingWrapper = ({ children, duration = 1000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
