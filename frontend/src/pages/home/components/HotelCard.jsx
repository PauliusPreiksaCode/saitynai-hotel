/* eslint-disable no-unused-vars, react/prop-types */
import React from "react";
import { Card, Typography, Box } from "@mui/material";
import styles from "../Home.module.css";


const HotelCard = ({ hotel, setSelectedHotel }) => {

    return (
        <Card key={hotel.id} className={styles.HotelCard} onClick={() => setSelectedHotel(hotel)}>
             <img src={hotel.photo} alt={hotel.name} className={styles.HotelPhoto} />
                <Box className={styles.HotelInfo}>
                    <Typography variant="h5">
                        {hotel.name}
                    </Typography>
                    <Typography variant="body1">
                        {hotel.location}
                    </Typography>
                </Box>
        </Card>
    )
}

export default HotelCard;