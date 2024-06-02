import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardComponent = ({ item }) => (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
        <CardMedia
            component="img"
            alt="profile image"
            height="140"
            image={`https://erpsystem.darakoutlet.com${item.user.profileimage}`}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.request_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {item.description}
            </Typography>
            {item.request_type === "Sick Leave" ||
                item.request_type === "Annual Vacation" ? (
                <Typography variant="body2" color="text.secondary">
                    From {item.fromdate} To {item.todate}
                </Typography>
            ) : null}
            {item.request_type === "Errands" ||
                item.request_type === "ClockIn Excuse" ||
                item.request_type === "ClockOut Excuse" ? (
                <Typography variant="body2" color="text.secondary">
                    From {item.from_ci} To {item.to_co}
                </Typography>
            ) : null}
        </CardContent>
        <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
        </CardActions>
    </Card>
);

export default CardComponent;
