import React from "react";
import { Button, Box, Typography, Container } from "@mui/material";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state when an error is thrown
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log this to an error tracking service
    console.error("App crashed:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            backgroundColor: "white",
            minHeight: "91vh",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
              😵 Something went wrong.
            </Typography>
            <Typography variant="body1" color="gray" sx={{ mb: 4 }}>
              The app encountered an unexpected error. Try reloading the page.
            </Typography>
            <Button
              variant="contained"
              onClick={this.handleReload}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Reload Page
            </Button>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}
