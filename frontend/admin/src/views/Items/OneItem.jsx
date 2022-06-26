import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CustomModal from "../../components/CustomModal";
import ItemForm from "./ItemForm";

import { updateItem } from "../../actions";
import { camelToPascalCase } from "../../utils";

import { imageSrcRoute } from "../../assets/img";

const OneItem = (props) => {
  const { row, open, toggleModal } = props;
  const { itemName, image } = row;
  const [editableInput, setEditableInput] = useState();
  const [imageSrc, setImageSrc] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const dispatch = useDispatch();

  const { [editableInput?._id]: originalData } = useSelector(
    (state) => state.itemsData
  );
  useEffect(() => {
    setEditableInput(row);
    setImageSrc(
      image.map((img) => {
        return `${imageSrcRoute}/${img}`;
      })
    );
  }, [row]);

  const handleSubmit = () => {
    toggleModal();
    const updated = Object.fromEntries(
      Object.entries(editableInput).filter(
        (each) => each[1] !== originalData[each[0]]
      )
    );
    const formData = new FormData();
    newImage &&
      newImage.forEach((img, i) => {
        formData.append(i, img);
      });

    updated._id = editableInput._id;

    (newImage || updated) &&
      dispatch(
        updateItem({
          formData,
          updated,
          cb: () => {
            toggleModal();
          },
        })
      );
  };

  const handleChange = {
    file: (e) => {
      const tempImg = [...newImage];
      const tempSrc = [...imageSrc];
      tempImg.push(e.target.files[0]);
      tempSrc.push(URL.createObjectURL(e.target.files[0]));
      setNewImage(tempImg);
      setImageSrc(tempSrc);
    },
    formInput: (e) => {
      const { name, value } = e.currentTarget;
      setEditableInput({ ...editableInput, [name]: value });
      console.log("editable", editableInput);
    },
  };

  const handleClick = {
    removeImage: (e, index) => {
      e.preventDefault();
      const tempImg = [...editableInput.image];
      const tempSrc = [...imageSrc];
      if (index > -1) {
        tempImg.splice(index, 1);
        tempSrc.splice(index, 1);
        setImageSrc(tempSrc);
        setEditableInput({ ...editableInput, image: tempImg });
      } else {
        throw new Error("Check Add Item.jsx Image Handler");
      }
    },
  };

  const editableFilter = [
    "tags",
    "itemCode",
    "itemName",
    "nepaliItemName",
    "category",
    "brand",
    "inventory",
    "rate",
    "marketRate",
    "minOrder",
    "description",
  ];

  return (
    <CustomModal
      toggleModal={toggleModal}
      open={open}
      title={`Data Display of ${itemName}`}
      handleSubmit={handleSubmit}
    >
      <ItemForm
        itemLabels={Object.keys(row).map((e, i) => ({
          name: e,
          pascal: camelToPascalCase(e),
          editable: editableFilter.includes(e),
        }))}
        handleChange={handleChange}
        imageRemove={handleClick.removeImage}
        inputData={editableInput}
        imageSrc={imageSrc}
      />
    </CustomModal>
  );
};

export default OneItem;
