import React, { useState, useEffect, Profiler, Suspense } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { onRenderCallback } from "../utils/onRenderCallback";

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

  // Display loading spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
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

        <Suspense fallback={<CircularProgress />}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Box sx={{ display: { xs: "block", sm: "none" }, mb: 2 }}>
              {filteredUsers.map((user) => (
                <Box
                  key={user.id}
                  sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1 }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          component="span"
                          color="text.primary"
                        >
                          {user.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {user.email}
                          </Typography>
                          <br />
                          <Typography variant="body2" component="span">
                            Phone: {user.phone} | Company: {user.company.name}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              href={`mailto:${user.email}`}
                            >
                              Contact
                            </Button>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                </Box>
              ))}
            </Box>

            <List sx={{ display: { xs: "none", sm: "block" } }}>
              {filteredUsers.map((user, index) => (
                <div key={user.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          component="span"
                          color="text.primary"
                        >
                          {user.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {user.email}
                          </Typography>
                          <br />
                          <Typography variant="body2" component="span">
                            Phone: {user.phone} | Company: {user.company.name}
                          </Typography>
                        </>
                      }
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      href={`mailto:${user.email}`}
                    >
                      Contact
                    </Button>
                  </ListItem>
                  {/* No se muestra el divider en el último elememento o si hay uno sol */}
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
