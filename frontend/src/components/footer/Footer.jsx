import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FooterModal from './FooterModal';

const Footer = () => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    <Box 
      component="footer" 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#FFDDAE',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <div onClick={() => setOpenModal(true)} style={{ display: "inline-block", cursor: "pointer", position: "relative" }}>
      <Typography variant="body1" style={{
          textDecoration: "underline",
          display: "inline-block",
        }}>
        Paulius Preikša
      </Typography>
      </div>
    </Box>
    {openModal && <FooterModal open={openModal} handleClose={() => setOpenModal(false)} />}
    </>
  );
};

export default Footer;
