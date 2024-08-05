"use client";

import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const PantryForm = ({ itemToEdit, onUpdate }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
    } else {
      setItemName('');
      setQuantity('');
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        await updateDoc(doc(db, 'pantryItems', itemToEdit.id), {
          name: itemName,
          quantity: quantity,
        });
        onUpdate();
      } else {
        await addDoc(collection(db, 'pantryItems'), {
          name: itemName,
          quantity: quantity,
        });
      }
      setItemName('');
      setQuantity('');
    } catch (err) {
      console.error("Error adding/updating document: ", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          fullWidth
          className="mb-4"
          margin="normal"
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          fullWidth
          className="mb-4"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {itemToEdit ? 'Update Item' : 'Add Item'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PantryForm;
