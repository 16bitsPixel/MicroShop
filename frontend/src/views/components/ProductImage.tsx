import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

interface ProductImageProps {
  image: string;
}

export function ProductImage({ image }: ProductImageProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card sx={styles.card}>
      {/* Box wrapping CardMedia */}
      <Box
        sx={{
          ...styles.cardMediaWrapper,
          ...(isHovered && styles.cardMediaHovered),
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          image={image}
          sx={styles.cardMedia}
          aria-label="cardImage"
        />
      </Box>
    </Card>
  );
}

const styles = {
  // The Card itself adjusts based on the screen size
  card: {
    width: { xs: '300px', md: '500px', xl: '800px' }, // Responsive width
    height: { xs: '300px', md: '500px', xl: '800px' }, // Responsive height
    borderRadius: '8px', // Optional: Add border radius for rounded corners
    overflow: 'hidden', // Ensure content doesn't overflow the card boundary
  },
  // The Box for the image, which will scale to fill the Card
  cardMediaWrapper: {
    position: 'relative',
    width: '100%', // Take the full width of the Card
    height: '100%', // Take the full height of the Card
    overflow: 'hidden', // Hide overflowed content
  },
  // Styling the image itself to fit inside the Box
  cardMedia: {
    objectFit: 'cover', // Ensures image fills the box without distortion
    width: '100%',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
  },
  // Zoom-in effect for the image when hovered
  cardMediaHovered: {
    transform: 'scale(1.1)', // Slight zoom-in effect when hovered
  },
};
