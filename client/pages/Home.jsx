import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  ButtonGroup,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Navbar from "../components/Navbar";

const Temp = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // Local cart state
  const [isCartOpen, setIsCartOpen] = useState(false); // To toggle cart drawer

  useEffect(() => {
    fetchapi();
  }, []);

  const fetchapi = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const response = await data.json();
      setProducts(response);
      setAllProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    if (category === "all") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Product Added to Cart")
  };

  const handleRemoveFromCart = (id) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
    toast.success("Product removed from Cart")
  };

  // Calculate total cart value
  const totalCartValue = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      <div style={{ padding: "20px" }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Product List
        </Typography>

        <ButtonGroup variant="contained" color="primary" style={{ marginBottom: "20px" }}>
          {["all", "electronics", "jewelery", "men's clothing", "women's clothing"].map(
            (category) => (
              <Button key={category} onClick={() => handleCategoryFilter(category)}>
                {category}
              </Button>
            )
          )}
        </ButtonGroup>

        {loading ? (
          <Typography variant="h6" style={{ textAlign: "center" }}>
            Loading products...
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card style={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.title}
                    style={{ objectFit: "contain", padding: "10px" }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description.substring(0, 100)}...
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      style={{ marginTop: "10px" }}
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <div style={{ width: "400px", padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Your Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="body1">Your cart is empty.</Typography>
          ) : (
            <>
              <List>
                {cart.map((item) => (
                  <ListItem key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <Typography variant="body1">{item.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        ${item.price} x {item.quantity}
                      </Typography>
                    </div>
                    <div>
                      <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                        <RemoveIcon />
                      </IconButton>
                      <IconButton onClick={() => handleAddToCart(item)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Total: ${totalCartValue.toFixed(2)}
              </Typography>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Temp;
