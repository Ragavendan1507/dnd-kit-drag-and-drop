import { memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Background() {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '90%',
          height: '90%',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      ></Card>
    </Box>
  );
}

export default memo(Background);
