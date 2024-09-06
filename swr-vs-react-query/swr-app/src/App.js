import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const { data, error } = useSWR(
    'https://api.github.com/repos/facebook/react/issues',
    fetcher
  );

  if (error) return <div>Error memuat data</div>;
  if (!data) return <div>Memuat...</div>;

  return (
    <div>
      <h1>Daftar Isu React (SWR)</h1>
      <ul>
        {data.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
