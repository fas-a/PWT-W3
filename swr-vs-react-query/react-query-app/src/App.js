import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function App() {
  const fetchIssues = async () => {
    const { data } = await axios.get(
      'https://api.github.com/repos/facebook/react/issues'
    );
    return data;
  };

  const { data, error, isLoading } = useQuery('issues', fetchIssues);

  if (isLoading) return <div>Memuat...</div>;
  if (error) return <div>Error memuat data</div>;

  return (
    <div>
      <h1>Daftar Isu React (React Query)</h1>
      <ul>
        {data.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
