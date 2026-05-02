import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);

    fetch(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
        return res.text();
      })
      .then(text => {
        try {
          setData(JSON.parse(text)); // try JSON first
        } catch {
          setData(text); // fallback to raw text (markdown)
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
