import React, { useState, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import CustomModal from "../CustomModal";

import navbarStyle from "./index.styles";
import { getStoredProps, setLocalStorage } from "../../utils";
import { changeLanguage } from "../../actions";
import { logo } from "../../assets/img";

const useStyles = makeStyles(navbarStyle);

function Navbar(props) {
  const history = useHistory();
  const {
    isLogged,
    cartData,
    langPreference,
    languageData,
    itemsData,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [recommendation, setRecommendation] = useState([]); //**Todo <prajwal> Recent Search */
  const [searchFocused, setSearchFocused] = useState(false);
  const classes = useStyles();
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navBar = useRef(null);

  const totalQty = Object.keys(cartData).length;

  React.useEffect(() => {
    searchText === ""
      ? setRecommendation([])
      : setRecommendation(
          Object.values(itemsData)
            .filter((item) =>
              item.itemName.toUpperCase().includes(searchText.toUpperCase())
            )
            .slice(0, 7)
        );
    !searchFocused && setRecommendation([]);
  }, [searchText]);

  const handleClick = {
    search: (e) => {
      history.push(`/search/${e}`);
    },
    gotoItem: (e) => {
      history.push(`/item/${e}`);
    },
    compare: () => {
      history.push("/compare");
    },
    account: () => {
      history.push("/account");
    },
    login: () => {
      history.push("/login");
    },
  };

  const Brand = () => (
    <img
      src={logo}
      alt="logo"
      className={classes.logo}
      onClick={() => history.push("/")}
    />
  );

  const SearchRecommendation = () => (
    <List
      component="nav"
      className={classes.recommendationRoot}
      aria-label="Recommendations"
      style={{
        width:
          (desktopSearchRef.current && desktopSearchRef.current.offsetWidth) ||
          (mobileSearchRef.current && mobileSearchRef.current.offsetWidth),
        top: navBar.current && navBar.current.offsetHeight,
      }}
    >
      {recommendation.map((r, i) => (
        <ListItem
          button
          key={i}
          onClick={() => {
            handleClick.gotoItem(r._id);
            setRecommendation([]);
          }}
        >
          <ListItemText primary={r.itemName} />
        </ListItem>
      ))}
    </List>
  );

  const Search = () => (
    <div className={classes.search}>
      <InputBase
        placeholder="Search MahaanExpress"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          setSearchText(e.currentTarget.value);
        }}
        value={searchText}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleClick.search(e.currentTarget.value);
            setRecommendation([]);
          }
        }}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
      <div
        className={classes.searchIcon}
        onClick={(e) => {
          handleClick.search(searchText);
        }}
      >
        <SearchIcon />
      </div>
      {SearchRecommendation()}
    </div>
  );

  const Icons = () => (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        classes={{ root: classes.iconButton }}
        onClick={handleClick.compare}
      >
        <MonetizationOnIcon />
        <Hidden smDown>
          <Typography color="textPrimary" style={{ marginLeft: 5 }}>
            {languageData["Market Today"]}
          </Typography>
        </Hidden>
      </IconButton>

      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={() => history.push("/cart")}
      >
        <Badge
          badgeContent={totalQty}
          color="secondary"
          style={{ marginRight: 5 }}
        >
          <ShoppingCartIcon />
        </Badge>
        <Hidden smDown>
          <Typography color="textPrimary" style={{ marginLeft: 5 }}>
            Cart
          </Typography>
        </Hidden>
      </IconButton>

      <IconButton
        onClick={isLogged ? handleClick.account : handleClick.login}
        edge="end"
        aria-label="account of current user"
        classes={{ root: classes.iconButton }}
      >
        <PersonIcon />
        <Hidden smDown>
          <Typography color="textPrimary" style={{ marginLeft: 5 }}>
            {isLogged ? <>Account</> : <>Login/Register</>}
          </Typography>
        </Hidden>
      </IconButton>
      <p
        onClick={() => dispatch(changeLanguage(langPreference))}
        style={{ cursor: "pointer", color: "black" }}
      >
        {langPreference === "EN" ? "NP" : "EN"}
      </p>
    </>
  );

  return (
    <AppBar position="sticky" className={clsx(classes.appBar, {})} ref={navBar}>
      <Toolbar
        classes={{ gutters: classes.toolbarGutter }}
        className={classes.sectionDesktop}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justify="center">
            <Grid item lg={1} md={1} className={classes.logoContainer}>
              <Brand />
            </Grid>
            <Grid item lg={5} md={5} ref={desktopSearchRef}>
              {Search()}
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Icons />
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      <Toolbar
        className={classes.sectionMobile}
        classes={{ regular: classes.toolbarRegular }}
      >
        <div className={classes.logoContainer}>
          <Brand />
        </div>
        <div className={classes.grow} />

        <Icons />
      </Toolbar>
      <div className={classes.sectionMobile} ref={mobileSearchRef}>
        {Search()}
      </div>
    </AppBar>
  );
}

export default Navbar;
