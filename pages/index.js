import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import imgs from "../public/data/grid-gallery-data.json";
import { Box } from "@mui/system";
import "react-image-lightbox/style.css";

const Index = () => {
  const [index, setIndex] = useState(-1);
  const currentImage = imgs[index];
  const nextIndex = (index + 1) % imgs.length;
  const nextImage = imgs[nextIndex] || currentImage;
  const prevIndex = (index + imgs.length - 1) % imgs.length;
  const prevImage = imgs[prevIndex] || currentImage;

  const handleClick = (index) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMoveNext = () => setIndex(nextIndex);
  const handleMovePrev = () => setIndex(prevIndex);

  return (
    <Box backgroundColor={(theme) => theme.palette.background.default}>
      <AppBar sx={{ position: "relative", zIndex: 950 }}>
        <Toolbar>
          <Typography variant="h6" component="span" color="inherit">
            Central America 2023
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography
        sx={{
          padding: (theme) =>
            `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        }}
        variant="h1"
        align="center"
      >
        Central America 2023
      </Typography>
      <Box
        backgroundColor={(theme) => theme.palette.background.paper}
        maxWidth="calc(58 * 1rem)"
        margin="0 auto"
        overflow="auto"
      >
        <Gallery
          images={imgs}
          onClick={handleClick}
          enableImageSelection={false}
        />
      </Box>
      {!!currentImage && (
        <Lightbox
          mainSrc={currentImage.original}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
          enableZoom={false}
          reactModalStyle={{ zIndex: 2000 }}
        />
      )}
    </Box>
  );
};

export default Index;
