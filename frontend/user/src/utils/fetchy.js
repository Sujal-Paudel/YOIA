// 1.1.0-2020.04.30.A

function fetchy(url, method, data) {
  return new Promise((resolve, reject) => {
    if (typeof data === "object" || typeof data === "undefined") {
      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.redirected) {
            console.warn("redirect overridden");
            window.location.pathname !== "/" &&
              (window.location.href = res.url);
            resolve({ success: false });
          } else if (res.status === 401) {
            console.warn("insufficient credentials");
            // localStorage.clear();
            // window.location.pathname !== "/" &&
            //   (window.location.pathname = "/");
            resolve({ success: false });
          } else if (res.status === 500 || res.status === 404) {
            console.error(res.error);
            resolve({ success: false });
          } else {
            resolve(res.json());
          }
        })
        .catch((e) => {
          console.error("network problem");
          // handle offline alerts here
        });
    } else {
      console.error(
        "data field must be either blank or JSON, others not supported"
      );
      reject();
    }
  });
}

export default fetchy;
