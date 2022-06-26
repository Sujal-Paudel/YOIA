import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import fetchy from "../../utils/fetchy";

import "./AddPrinting.scss";
import { fetchPrintingData } from "../../actions";

function AddLaundry({ setToggleAdd }) {
  const dispatch = useDispatch();

  const template = {
    documents: {
      file: "",
      orientation: "portrait",
      side: "single",
      copies: "1"
    },
    otherData: {
      title: "",
      details: ""
    }
  };
  const [documents, setDocuments] = useState([template.documents]);
  const [otherData, setOtherData] = useState(template.otherData);

  const handleChange = {
    numOfDocuments: num => {
      if (num > 20) {
        alert("Whoa!");
        return;
      }
      if (num < documents.length) {
        setDocuments(documents.slice(0, num));
      } else {
        for (let i = documents.length; i < num; i++) {
          documents.push(template.documents);
        }
        setDocuments([...documents]);
      }
    },
    file: (e, index) => {
      documents[index].file = e.currentTarget.files[0];
      setDocuments([...documents]);
    },
    orientation: (e, index) => {
      documents[index].orientation = e.currentTarget.value;
      setDocuments([...documents]);
    },
    side: (e, index) => {
      documents[index].side = e.currentTarget.value;
      setDocuments([...documents]);
    },
    copies: (e, index) => {
      documents[index].copies = e.currentTarget.value;
      setDocuments([...documents]);
    }
  };

  function submitData() {
    const req = { ...otherData, documents };

    const formData = new FormData();
    documents.forEach((doc, i) => {
      formData.append(i, doc.file);
    });

    fetch("/api/v1/uploads/user-files", {
      method: "PUT",
      body: formData
    })
      .then(e => e.json())
      .then(res => {
        console.log(res);
        if (res.success) {
          req.documents.forEach((doc, i) => {
            delete req.documents[i].file;
            req.documents[i].fileName = res.fileName[i];
          });

          fetchy(`/api/v1/printing`, "PUT", req).then(res => {
            console.log(res);
            if (res.success) {
              // **TODO** prompt here
              setDocuments([template.documents]); // reset
              setOtherData(template.otherData); // reset
              setToggleAdd(false);
              dispatch(
                fetchPrintingData({
                  status: ["pending", "reviewed", "ready"],
                  type: "POPULATE_PRINTING"
                })
              );
            }
          });
        }
      });
  }

  return (
    <div className="addPrinting">
      <h3 className="addPrinting__title">Add Documents to Print</h3>

      <div className="addPrinting__numOfDocs">
        <p>Number of Files I have:</p>
        <input
          className="addPrinting__number"
          value={documents.length || ""}
          onChange={e => handleChange.numOfDocuments(e.currentTarget.value)}
        />
        <button
          className="addPrinting__incbtn"
          onClick={() => handleChange.numOfDocuments(documents.length + 1)}
        >
          +
        </button>
      </div>

      <div style={{ overflow: "auto" }}>
        <div className="printTable">
          <div className="printTable__header-container">
            <p className="printTable__header-title">File</p>
            <p className="printTable__header-title">Orientation</p>
            <p className="printTable__header-title">Side</p>
            <p className="printTable__header-title">Copies</p>
          </div>
          <div className="printTable__body-container">
            {documents.map((doc, index) => (
              <div className="printTable__body" key={index}>
                <div className="printTable__body-item">
                  <input
                    type="file"
                    onChange={e => handleChange.file(e, index)}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                <div className="printTable__body-item">
                  <select
                    className="addPrinting__select"
                    value={doc.orientation}
                    onChange={e => handleChange.orientation(e, index)}
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
                <div className="printTable__body-item">
                  <select
                    className="addPrinting__select"
                    value={doc.side}
                    onChange={e => handleChange.side(e, index)}
                  >
                    <option value="single">Single</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="printTable__body-item">
                  <input
                    className="printTable__input"
                    value={doc.copies}
                    onChange={e => handleChange.copies(e, index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="addPrinting__options">
          <p className="addPrinting__option">Title: </p>
          <input
            className="addPrinting__input"
            onChange={e =>
              setOtherData({ ...otherData, title: e.currentTarget.value })
            }
            placeholder="This will be the Document Title"
          />
        </div>
        <div className="addPrinting__options">
          <p className="addPrinting__option">Details: </p>
          <input
            className="addPrinting__input"
            onChange={e =>
              setOtherData({ ...otherData, details: e.currentTarget.value })
            }
            placeholder="Include details like binding, stapler and cover pages"
          />
        </div>

        <div className="addPrinting_submit">
          <button className="_button_round" onClick={submitData}>
            add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLaundry;
