import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";

import type { CartItem } from "../../Types/Cart";

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartDrawer = ({
  isOpen,
  cartItems,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: CartDrawerProps) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "100%",
              sm: 420,
            },
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      {/* Header */}

      <Box
        sx={{
          p: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Your Cart
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items
          </Typography>
        </Box>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Cart items */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2.5,
        }}
      >
        {cartItems.length === 0 ? (
          <Stack
            sx={{
              height: "70%",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: 48 }}>🛒</Typography>

            <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
              Your cart is empty
            </Typography>

            <Typography color="text.secondary" variant="body2">
              Add some products to get started.
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Box key={item.id}>
                <Stack direction="row" spacing={1.5}>
                  <Box
                    component="img"
                    src={item.thumbnail}
                    alt={item.title}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      bgcolor: "#f5f5f3",
                      borderRadius: 2,
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, mt: 0.5 }}
                    >
                      ${item.price}
                    </Typography>

                    <Stack
                      direction="row"
                      sx={{
                        mt: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        direction="row"
                        // alignItems="center"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1.5,
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => onDecrease(item.id)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography variant="body2" sx={{ px: 1 }}>
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => onIncrease(item.id)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onRemove(item.id)}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </Stack>

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Footer */}

      {cartItems.length > 0 && (
        <Box
          sx={{
            p: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack
            direction="row"
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Subtotal</Typography>

            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 700,
              boxShadow: "none",
            }}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default CartDrawer;
