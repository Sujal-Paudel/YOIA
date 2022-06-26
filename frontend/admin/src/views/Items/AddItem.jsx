import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

import CustomModal from "../../components/CustomModal";
import ItemForm from "./ItemForm";

import { addItem } from "../../actions";
import { camelToPascalCase } from "../../utils";

function AddItem() {
  const dispatch = useDispatch();

  const init = {
    itemCode: "",
    itemName: "",
    nepaliItemName: "",
    image: [],
    category: "",
    brand: "",
    tags: [],
    inventory: "",
    rate: "",
    marketRate: "",
    minOrder: "",
    description: "",
  };

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState(init);
  const [imageSrc, setImageSrc] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);

  const handleClick = {
    toggleModal: () => {
      setOpen(!open);
    },
    addItem: () => {
      const req = { ...inputData, tags: tagsArray };
      const formData = new FormData();
      inputData.image.forEach((img, i) => {
        formData.append(i, img);
      });
      dispatch(
        addItem({
          formData,
          req,
          cb: () => {
            setInputData(init);
            setOpen(false);
            setImageSrc([]);
          },
        })
      );
    },
    removeImage: (e, index) => {
      e.preventDefault();
      const tempImg = [...inputData.image];
      const tempSrc = [...imageSrc];
      if (index > -1) {
        tempImg.splice(index, 1);
        tempSrc.splice(index, 1);
        setImageSrc(tempSrc);
        setInputData({ ...inputData, image: tempImg });
      } else {
        throw new Error("Check Add Item.jsx Image Handler");
      }
    },
    onTagDelete: (index) => {
      const tempTag = [...tagsArray];
      if (index > -1) {
        tempTag.splice(index, 1);
        setTagsArray(tempTag);
      }
    },
  };

  const handleChange = {
    formInput: (e) => {
      const { name, value } = e.target;
      if (name === "tags" && value.charAt(value.length - 1) === " ") {
        if (inputData.tags.length === 0) {
          return;
        }
        setTagsArray([...tagsArray, ...inputData.tags.split(" ")]);
        setInputData({ ...inputData, tags: [] });
        return;
      }
      setInputData({ ...inputData, [name]: value });
      console.log(tagsArray);
    },
    file: (e) => {
      const tempImg = [...inputData.image];
      const tempSrc = [...imageSrc];
      tempImg.push(e.target.files[0]);
      tempSrc.push(URL.createObjectURL(e.target.files[0]));
      setInputData({ ...inputData, image: tempImg });
      setImageSrc(tempSrc);
    },
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick.toggleModal}>
        Add New Item
      </Button>
      {/**TODO <Prajwal> Use OneItem.jsx   */}
      <CustomModal
        toggleModal={handleClick.toggleModal}
        open={open}
        title="Add Item"
        handleSubmit={handleClick.addItem}
      >
        <ItemForm
          itemLabels={Object.keys(init).map((e) => ({
            name: e,
            pascal: camelToPascalCase(e),
            editable: true,
          }))}
          handleChange={handleChange}
          imageRemove={handleClick.removeImage}
          inputData={inputData}
          imageSrc={imageSrc}
          tagsArray={tagsArray}
          onTagDelete={handleClick.onTagDelete}
        />
      </CustomModal>
    </div>
  );
}

export default AddItem;
