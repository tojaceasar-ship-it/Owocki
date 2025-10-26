import React, { useEffect, useState } from 'react';
import { client } from './lib/sanity';

function App() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await client.fetch('*[_type == "homepage"]');
        setContent(data[0]);
      } catch (error) {
        console.error('Error fetching content from Sanity:', error);
      }
    };
    fetchContent();
  }, []);

  if (!content) {
    return <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>{content.title || 'Fruits From Da Hood'}</h1>
      <p>{content.description || 'Welcome to Fruits From Da Hood!'}</p>
    </div>
  );
}

export default App;
