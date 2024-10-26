import React, { useState, useEffect, Profiler, Suspense } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  List,
  Divider,
} from "@mui/material";
import { onRenderCallback } from "../../utils/onRenderCallback";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import UserCard from "./UserCard";

function SupportPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleContactClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Profiler id="SupportPage" onRender={onRenderCallback}>
      <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Support Contacts
        </Typography>

        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />

        <Suspense fallback={<Loader />}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <List>
              {filteredUsers.map((user, index) => (
                <div key={user.id}>
                  <UserCard user={user} onContact={handleContactClick} />
                  {index < filteredUsers.length - 1 && (
                    <Divider variant="middle" sx={{ my: 1 }} />
                  )}
                </div>
              ))}
            </List>
          </Paper>
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default SupportPage;
