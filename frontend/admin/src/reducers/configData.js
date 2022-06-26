const initialState = {
  bannerImages: [],
  featured: [],
  bestValue: [],
  popular: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_CONFIG-DATA":
      return { ...payload };
    case "UPDATE_FEATURED":
      return { ...state, featured: [...payload] };
    case "UPDATE_BESTVALUE":
      return { ...state, bestValue: [...payload] };
    case "UPDATE_POPULAR":
      return { ...state, popular: [...payload] };
    case "UPDATE_BANNER":
      return { ...state, bannerImages: [...payload] };
    default:
      return state;
  }
};
