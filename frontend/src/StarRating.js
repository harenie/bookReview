import React from "react";
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

class StarRating extends React.Component {
  render() {
    return (
      <div className="starRating">
        <Stack spacing={1}>
          <Stack direction="row" spacing={2}>
            Direction
            <Rating name="half-rating" defaultValue={this.props.direction} precision={0.5} readOnly />
          </Stack>
          <Stack direction="row" spacing={2}>
            Acting
            <Rating name="half-rating" defaultValue={this.props.acting} precision={0.5} readOnly />
          </Stack>
          <Stack direction="row" spacing={2}>
            Screenplay
            <Rating name="half-rating" defaultValue={this.props.screen} precision={0.5} readOnly/>
          </Stack>
          <Stack direction="row" spacing={2}>
            Music
            <Rating name="half-rating" defaultValue={this.props.music} precision={0.5} readOnly/>
          </Stack>
          <Stack direction="row" spacing={2}>
            
            <Rating name="half-rating" defaultValue={this.props.rating} precision={0.5} size="large"/>
          </Stack>
        </Stack>
      </div>
    );
  }
}
export default StarRating;
