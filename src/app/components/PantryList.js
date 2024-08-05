"use client";

import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Button, TextField, Box, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PantryList = ({ onEdit, items, setItems }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'pantryItems', id));
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = (items || []).filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <TextField
        label="Search Items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        className="mb-4"
        margin="normal"
      />
      {filteredItems.map((item) => (
        <Paper key={item.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
            </Box>
            <Box>
              <IconButton onClick={() => onEdit(item)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(item.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default PantryList;
