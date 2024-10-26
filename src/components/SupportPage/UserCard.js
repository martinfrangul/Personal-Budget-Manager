import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

const UserCard = ({ user, onContact }) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar>{user.name.charAt(0)}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography variant="h6" component="span" color="text.primary">
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
    <Button variant="contained" color="primary" onClick={() => onContact(user.email)}>
      Contact
    </Button>
  </ListItem>
);

export default UserCard;
