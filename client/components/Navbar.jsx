import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount, onCartClick }) => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          {/* Branding */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Podtech
          </Typography>

          {/* Cart Button */}
          <IconButton color="inherit" onClick={onCartClick}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
