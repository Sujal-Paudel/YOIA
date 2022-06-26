import React from "react";

const useCustomTable = (items, defaultKey = null) => {
  const [sortConfig, setSortConfig] = React.useState({
    key: defaultKey,
    ascending: true,
  });

  const [searchConfig, setSearchConfig] = React.useState({
    key: null,
    input: null,
  });

  const sorted = React.useMemo(() => {
    let sortedData = [...items];
    if (sortConfig.key !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.ascending ? 1 : -1;
        } else return 0;
      });
    }
    return sortedData;
  }, [items, sortConfig]);

  const filtered = React.useMemo(() => {
    console.log(searchConfig);
    console.log(items);
    if (searchConfig.key !== null) {
      return items.filter((item) =>
        item[searchConfig.key]
          .toString()
          .toUpperCase()
          .includes(searchConfig.input.toUpperCase())
      );
    } else {
      //  search All feature
    }
  }, [items, searchConfig]);

  const customSort = (key) => {
    setSortConfig({ key, ascending: !sortConfig.ascending });
  };

  const customFilter = (input, key = null) => {
    setSearchConfig({ key, input });
  };

  return { sorted, customSort, sortConfig, filtered, customFilter };
};

export default useCustomTable;
