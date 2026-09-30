import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1280,
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 3 },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            // component="span"
            variant="h6"
            sx={{
              letterSpacing: "-0.5px",
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            InvesQ
            <Box
              component="span"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
              }}
            >
              Store
            </Box>
          </Typography>
        </Box>

        <IconButton
          onClick={onCartClick}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            px: 1.5,
          }}
        >
          <Badge badgeContent={cartCount} color="primary" max={99}>
            <ShoppingBagOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
