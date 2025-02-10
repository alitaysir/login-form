import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card style={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  style={{ objectFit: 'contain', padding: '10px' }}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="h6" color="primary" style={{ marginTop: '10px' }}>
                    ${item.price}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: '10px' }}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {cartItems.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
