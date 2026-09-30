import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import type { Product } from "../../Types/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Box
        sx={{
          height: { xs: 170, sm: 210, md: 230 },
          bgcolor: "#f5f5f3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          component="img"
          src={product.thumbnail}
          alt={product.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.3s ease",

            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Chip
          label={product.category}
          size="small"
          sx={{
            fontSize: 11,
            height: 24,
            mb: 1,
            textTransform: "capitalize",
          }}
        />

        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
          {product.title}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mt: 0.5, alignItems: "center" }}
        >
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
          />

          <Typography variant="caption" color="text.secondary">
            {product.rating}
          </Typography>
        </Stack>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1.5}
          sx={{
            mt: 2,
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            ${product.price}
          </Typography>

          <Button
            variant="contained"
            size="small"
            startIcon={<AddShoppingCartOutlinedIcon />}
            onClick={() => onAddToCart(product)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
