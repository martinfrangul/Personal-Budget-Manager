import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const RecommendationCard = ({ message }) => {
  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <CardContent>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
