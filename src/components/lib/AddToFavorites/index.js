import React from "react";
import {Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon} from "@material-ui/icons";
import {Tooltip} from "@material-ui/core";
import {FavotiteTooltipTitle} from "./constants";
export default function AddToFavorites(props) {
  const {isFavorite, onClick} = props;
  return (
    <Tooltip title={FavotiteTooltipTitle}>
      <div onClick={onClick}>{isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
    </Tooltip>
  );
}
