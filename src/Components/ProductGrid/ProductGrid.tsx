import { Box, Grid, Stack, Typography } from "@mui/material";

import type { Product } from "../..//Types/Product";
import ProductCard from "../ProductCard/ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <>
      {products.length === 0 ? (
        <Box
          sx={{
            border: "1px solid black",
            padding: "1rem",
          }}
        >
          <Stack
            direction="column"
            sx={{ justifyContent: "center", alignItems: "center" }}
            spacing={2}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              No Products found
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {products.map((product, i) => (
            <Grid
              key={product.id + `${i + 1}`}
              size={{
                xs: 6,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductGrid;
