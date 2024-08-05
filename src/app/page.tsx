"use client";

import { useState, useEffect } from 'react';
import PantryForm from 'D:/FellowShips/Headstarter/Project 2_Pantry_Tracker/newpantrytracker-main/newpantrytracker-main/src/app/components/PantryForm.js';
import PantryList from 'D:/FellowShips/Headstarter/Project 2_Pantry_Tracker/newpantrytracker-main/newpantrytracker-main/src/app/components/PantryList.js';
import { Container, Typography, Box } from '@mui/material';
import { db } from 'D:/FellowShips/Headstarter/Project 2_Pantry_Tracker/newpantrytracker-main/newpantrytracker-main/src/app/firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [itemToEdit, setItemToEdit] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'pantryItems'));
      setItems(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleUpdate = async () => {
    setItemToEdit(null);
    const querySnapshot = await getDocs(collection(db, 'pantryItems'));
    setItems(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <Container maxWidth="sm" className="flex min-h-screen flex-col items-center justify-center p-4">
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 3,
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Pantry Management
        </Typography>
        <PantryForm itemToEdit={itemToEdit} onUpdate={handleUpdate} />
        <PantryList onEdit={handleEdit} items={items} setItems={setItems} />
      </Box>
    </Container>
  );
}
