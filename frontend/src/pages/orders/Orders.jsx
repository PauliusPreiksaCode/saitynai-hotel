/* eslint-disable no-unused-vars, react/prop-types */

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState, useMemo } from "react";
import styles from "./Orders.module.css";
import roomTypes from "../../constants/roomTypes";
import { useGetHotels } from "../../hooks/hotels";
import { getAllMyOrders } from "../../services/api";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OrderViewModal from "./components/OrderViewModal";
import OrderDeleteModal from "./components/OrderDeleteModal";
import OrderEditModal from "./components/OrderEditModal";

const Orders = () => {

  const [hotelIds, setHotelIds] = useState([]);
  const getAllHotels = useGetHotels();
  const [orders, setOrders] = useState([]);

  const [showOrderViewModal, setShowOrderViewModal] = useState(false);
  const [showOrderEditModal, setShowOrderEditModal] = useState(false);
  const [showOrderRemoveModal, setShowOrderRemoveModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const memoizedHotelIds = useMemo(() => {
    return getAllHotels?.data?.map((hotel) => hotel.id) || [];
  }, [getAllHotels.data]);
  
  useEffect(() => {
    if (memoizedHotelIds.length > 0) {
      setHotelIds(memoizedHotelIds);
    }
  }, [memoizedHotelIds]); 

  useEffect(() => {
    if (hotelIds.length > 0) {
      const fetchOrders = async () => {
        try {
          const ordersQueries = await Promise.all(
            hotelIds?.map(async (hotelId) => ({
              data: await getAllMyOrders(hotelId),
            }))
          );
  
          const allOrders = ordersQueries.flatMap(item => item.data);
          setOrders(allOrders);
        } catch (error) {
          console.error("Error fetching orders", error);
        }
      };
  
      fetchOrders();
    }
  }, [hotelIds]); 
  
  if(getAllHotels.isLoading || getAllHotels.isFetching) {
    return <CircularProgress />
  }

  const columns = [
    { field: "hotel", headerName: "Hotel name", minWidth: 200, renderCell: (params) => params.row.hotel.name },
    { field: "roomType", headerName: "Room type", minWidth: 150, renderCell: (params) => roomTypes[params.row.roomType] },
    { field: "breakfast", headerName: "Breakfast", minWidth: 200, renderCell: (params) => params.row.breakfast ? "Bought" : "Not bought"},
    { field: "orderDate", headerName: "Order date", minWidth: 200, renderCell: (params) => params.row.orderDate.split("T")[0] },
    { field: "peopleCount", headerName: "Number of people", minWidth: 200 },
    { field: "period", headerName: "Reservation in days", minWidth: 200 },
    { field: "price", headerName: "Price", minWidth: 200 },
    { field: "actions", headerName: "Actions", minWidth: 110, maxWidth: 110, sortable: false, flex: 1, 
      renderCell: (params) => {
        return (
          <div style={{ margin: "auto" }}>
            <IconButton
              aria-label="view"
              sx={{ color: "blue", marginRight: "-15px" }}
              onClick={() => handleOrderView(params.row)}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              sx={{ color: "orange", marginRight: "-15px" }}
              onClick={() => handleOrderEdit(params.row)}
            >
              <EditNoteIcon />
            </IconButton>
            <IconButton
              aria-label="remove"
              sx={{ color: "red" }}
              onClick={() => handleOrderRemove(params.row)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setShowOrderViewModal(true);
  }

  const handleOrderEdit = (order) => {
    setSelectedOrder(order);
    setShowOrderEditModal(true);
  }

  const handleOrderRemove = (order) => {
    setSelectedOrder(order);
    setShowOrderRemoveModal(true);
  }

  return (
    <>
    <Box className={styles.OrdersContainer}>
      <Box className={styles.TitleContainer}>
        <Typography variant="h3">
          My bookings
        </Typography>
      </Box>
      <Box >
        <Grid container spacing={2}>
          {orders.length > 0 ? (
            <DataGrid
              autoWidth
              autoHeight
              border={"none"}
              rows={orders}
              columns={columns}
              disableColumnMenu={true}
              disableColumnFilter={true}
              disableColumnSorting={true}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              columnVisibilityModel={{
                id: false,
              }}
              />
            ) : (
            <Grid item xs={12}>
              <Typography variant="h5" style={{display: "flex", justifyContent: "center"}}>No orders found</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
    {showOrderViewModal && (
      <OrderViewModal
        open={showOrderViewModal}
        handleClose={() => setShowOrderViewModal(false)}
        hotelId={selectedOrder?.hotel?.id}
        orderId={selectedOrder?.id}
      />
    )}
    {showOrderEditModal && (
      <OrderEditModal
        open={showOrderEditModal}
        handleClose={() => {setShowOrderEditModal(false); window.location.reload();}}
        hotelId={selectedOrder?.hotel?.id}
        orderId={selectedOrder?.id}
      />
    )}
    {showOrderRemoveModal && (
      <OrderDeleteModal
        open={showOrderRemoveModal}
        handleClose={() => {setShowOrderRemoveModal(false); window.location.reload();}}
        hotelId={selectedOrder?.hotel?.id}
        orderId={selectedOrder?.id}
      />
    )}
    </>
  );
}

export default Orders;