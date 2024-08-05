// components/Search.js
import { useState } from 'react';
import { TextField } from '@mui/material';

export default function Search({ setSearchQuery }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <TextField
      label="Search"
      value={query}
      onChange={handleSearch}
    />
  );
}
