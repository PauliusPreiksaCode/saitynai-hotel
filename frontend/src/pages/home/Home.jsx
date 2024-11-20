import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import styles from "./Home.module.css";
import HotelCard from "./components/HotelCard";
import OrderModal from "./components/OrderModal";
import SearchBar from "./components/SearchBar";
import { useGetHotels } from '../../hooks/hotels';
import CreateHotel from './components/CreateHotel';
import { UserContext } from '../../services/authProvider';
import '../../global.css';

const Home = () => {

  const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [addHotelOpen, setAddHotelOpen] = useState(false);
    const getHotels = useGetHotels();
    const userContext = useContext(UserContext);

    useEffect(() => {
      setHotels(getHotels.data || [])
      setFilteredHotels(getHotels.data || [])
  }, [getHotels.data])

  if(getHotels.isLoading || getHotels.isFetching) {
      <CircularProgress />
  }

  const userAccessLevel = userContext?.user?.decodedJwt?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  return (
    <Box className={styles.HomeContainer}>
        <Box className={styles.TitleContainer}>
            <Typography variant="h3">
                Welcome to the Hotel booking
            </Typography>
        </Box>
        <SearchBar hotels={hotels} setFilteredHotels={setFilteredHotels} /> 
        {(userAccessLevel === "Admin" || userAccessLevel === 'HotelPersonnel') &&
        <Button
            variant="contained"
            color="primary"
            onClick={() => setAddHotelOpen(true)}
        >
            Add Hotel
        </Button>}
        <Box className={styles.HotelsContainer}>
            <Grid container spacing={2}>
                {filteredHotels.length > 0 ? filteredHotels.map((hotel) => (
                    <Grid key={hotel.id} item xs={12} sm={6} md={4}>
                        <HotelCard hotel={hotel} setSelectedHotel={setSelectedHotel}/>
                    </Grid>
                )) : (
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{display: "flex", justifyContent: "center"}}>No hotels found</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
            <OrderModal open={!!selectedHotel} setOpen={() => setSelectedHotel(null)} hotel={selectedHotel} />
            {(userAccessLevel === "Admin" || userAccessLevel === 'HotelPersonnel') && <CreateHotel open={addHotelOpen} handleClose={() => setAddHotelOpen(false)} />}
    </Box>
)
};

export default Home;