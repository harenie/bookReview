import React from "react";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import StarRating from "./StarRating";
import InputField from "./InputField";
import "./App.css";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: 0,
      forceRefresh: false,
    };
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }
  async componentDidMount() {
    try {
      let res = await fetch(`${BACKEND_URL}/isLoggedIn`, {
        method: "post",
        headers: {
          Accept: "application.json",
          "Content-Type": "application.json",
        },
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        //UserStore.username=result.username;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
    window.addEventListener("loginStateChanged", this.handleLoginStateChanged);
    try {
      let res = await fetch(`${BACKEND_URL}/fetchM`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: UserStore.username,
        }),
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.array = result.id;
        UserStore.array.forEach((book) => {
          const reviews = JSON.parse(book.reviews_with_ratings);
          reviews.forEach((reviewObj) => {
            console.log(`${reviewObj.review} (Rating: ${reviewObj.rating})`);
          });
        });
        
        // alert(UserStore.array[5].name);
        // alert("arrayy");
      } else if (result && result.success === false) {
        // alert(result.msg);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // componentWillUnmount() {
  //   // Remove event listener to avoid memory leaks
  //   window.removeEventListener(
  //     "loginStateChanged",
  //     this.handleLoginStateChanged
  //   );
  // }
  handleLoginStateChanged = () => {
    // Update the state to trigger re-render
    this.setState({ forceRefresh: !this.state.forceRefresh });
  };

  handleDeleteReview = async (reviewId) => {
    if (!reviewId) {
      alert("Review ID is missing");
      return;
    }
  
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) {
      return; // Exit if the user cancels the action
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/deleteReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: reviewId }),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Review deleted successfully!");
        // Update local state to remove the review
        UserStore.array = UserStore.array.map((book) => {
          const updatedReviews = JSON.parse(book.reviews_with_ratings).filter(
            (review) => review.id !== reviewId
          );
          return { ...book, reviews_with_ratings: JSON.stringify(updatedReviews) };
        });
        this.setState({}); // Trigger re-render
      } else {
        alert(result.msg || "Failed to delete the review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("An error occurred while deleting the review. Please try again.");
    }
  };
  
  

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }

    this.setState({
      buttonDisabled: true,
    });

    try {
      let res = await fetch(`${BACKEND_URL}/login`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        //alert(UserStore.isLoggedIn);
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  async submitReview() {
    try {
      const { selectedbook, review, rating } = this.state;
  
      let res = await fetch(`${BACKEND_URL}/newReview`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookid: selectedbook.id,
          review,
          bookname: selectedbook.name,
          rating,
        }),
      });
  
      let result = await res.json();
      if (result && result.success) {
        alert("Successfully added your review. Thank you!");
        // Add the new review to the local state
        UserStore.array = UserStore.array.map((book) => {
          if (book.id === selectedbook.id) {
            const updatedReviews = [
              ...JSON.parse(book.reviews_with_ratings),
              { id: result.id, review, rating },
            ];
            return { ...book, reviews_with_ratings: JSON.stringify(updatedReviews) };
          }
          return book;
        });
        this.setState({ review: "", rating: 0 }); // Reset form fields
      } else {
        alert(result.msg || "Failed to add the review.");
      }
    } catch (e) {
      console.log(e);
      alert("An error occurred while adding the review. Please try again.");
    }
  }
  
  async doLogout() {
    try {
      let res = await fetch(`${BACKEND_URL}/logout`, {
        method: "post",
        headers: {
          Accept: "application.json",
          "Content-Type": "application.json",
        },
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  state = {
    isModalOpen: false,
  };

  handleOpenModal = (book) => {
    this.setState({ isModalOpen: true, selectedbook: book });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  

  render() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    const bull = (
      <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
      >
        •
      </Box>
    );
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading Please Wait....</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Welcome {UserStore.username}
                  </Typography>
                  <SubmitButton
                    text={"Log out"}
                    disabled={false}
                    onClick={() => this.doLogout()}
                  />
                </Toolbar>
              </AppBar>
            </Box>

            <div className="container2">
              <Box sx={{ flexGrow: 1, m: 4, pt: 8 }}>
                <Grid container spacing={0}>
                  {UserStore.array &&
                    UserStore.array.map((book) => (
                      <Card sx={{ minWidth: 275, m: 2 }}>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            <img
                              src={book.img}
                              className="photo"
                              alt={"kl"}
                              loading="lazy"
                            />
                          </Typography>
                          <Typography variant="h5" component="div">
                            {book.name}
                          </Typography>
                          <Typography variant="body2">
                            {book.author}
                            </Typography>
                          <Typography
                            sx={{ mb: 1.5 }}
                            color="text.secondary"
                          ></Typography>
                          <Typography variant="body2">
                          <ul style={{ listStyleType: 'none', padding: 0 }}>
                          {JSON.parse(book.reviews_with_ratings).map((reviewObj, index) => (
  <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <span>
      {reviewObj.review} <span style={{ color: 'gray' }}>Rating: <Rating name="read-only" value={reviewObj.rating} readOnly /></span>
    </span>
    <button 
      style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
      }}
      onClick={() => this.handleDeleteReview(reviewObj.id)} // Call the delete handler
    >
      Delete
    </button>
  </li>
))}

</ul>

                            <br />
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => this.handleOpenModal(book)}
                          >
                            Add Review
                          </Button>
                        </CardActions>
                      </Card>
                    ))}
                  <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {this.state.selectedbook && (
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Add Review for {this.state.selectedbook.name} book
                        </Typography>
                      )}
                      {/* <img
                              src={this.state.selectedbook.img}
                              className="photo"
                              alt={"kl"}
                              loading="lazy"
                            /> */}
                      {/* <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Add Review for the Modal
                      </Typography> */}
                      {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                      </Typography> */}
                      <Rating
                        name="simple-controlled"
                        value={this.state.rating} // Controlled value from state
                        onChange={(event, newValue) => {
                          this.setInputValue("rating", newValue); // Update the state
                        }}
                      />
                      <InputField
                        type="textarea"
                        placeholder="Review Please"
                        value={this.state.review ? this.state.review : ""}
                        onChange={(val) => this.setInputValue("review", val)}
                      />

                      <SubmitButton
                        text={"Add Review"}
                        disabled={false}
                        onClick={() => this.submitReview()}
                      />
                    </Box>
                  </Modal>
                </Grid>
              </Box>
            </div>
          </div>
        );
      } else {
        console.log(UserStore.isLoggedIn);
        return (
          <div className="app">
            <div className="container">
              <LoginForm />
            </div>
          </div>
        );
      }
    }
  }
}
export default observer(App);
