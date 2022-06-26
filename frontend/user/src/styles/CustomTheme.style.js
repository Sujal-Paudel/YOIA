import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  color: {
    main: "#ff9f0e",
    details: "#707070",
    danger: "#f44336",
    bgColor: "#fafafa",
    google: { main: "#4285F4", red: "#DB4437", secondary: "#035FF6" },
    facebook: { main: "#4267B2", secondary: "#3B5990" },
  },
  shadow: {
    cardHover: "1px 8px 8px -2px #ccc",
  },
  zIndex: {
    header: 4,
  },
  typography: {
    h3: {
      fontSize: "0.7rem",
      padding: "0px",
      "@media (min-width:600px)": {
        fontSize: "1.2rem",
      },
    },
    body1: {
      "@media (max-width:600px)": {
        fontSize: "0.85rem",
      },
    },
  },
});
export default theme;
