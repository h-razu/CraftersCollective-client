import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const CartDrawer = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <Box>
      <Drawer
        anchor="right"
        open={isCartOpen}
        sx={{ display: { xs: "none", sm: "block" } }}
        PaperProps={{
          sx: {
            width: "300px",
          },
        }}
      >
        <Stack
          flexDirection="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Typography variant="h5" pl={1}>
            Cart
          </Typography>
          <IconButton size="large" onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        {/* {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, idx) => (
              <CartItem key={idx} {...item} />
            ))}
            <Divider />
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: 30,
                fontWeight: 700,
                color: "steelblue",
              }}
            >
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = productData.find(
                    (itm) => itm.id === cartItem.id
                  );
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </Typography>
          </>
        ) : (
          <Typography color="error" variant="h3" padding={1}>
            Nothing in Cart
          </Typography>
        )} */}
      </Drawer>
    </Box>
  );
};

export default CartDrawer;
