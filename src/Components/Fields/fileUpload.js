import React, { useRef, useState } from "react";
import { ContentUploadIcon } from "Utils/svgIcons";
import { styled } from "styled-components";
import { theme } from "Utils/theme";
import SimpleModal from "Components/Modal/simpleModal";
import Cropper from "react-easy-crop";
import Button from "./button";
// import { uploadContentFileAPI } from "Services/Api/collection";
import { errorMessage, handleUploadFile } from "Utils/constants";

const CustomizeFileUpload = (props) => {
  const {
    onChange,
    error,
    helperText,
    value,
    name = "fileName",
    aspectRatio = 14 / 8,
  } = props;
  const [selectedFile, setSelectedFile] = useState(value);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);
  // const [finalResult, setFinalResult] = useState(null);
  // const [uploadStatus, setUploadState] = useState(0);
  const [loader, setLoader] = useState(false);
  const fileRef = useRef(null);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetModal = () => setOpenModal((pre) => !pre);

  const handleSubmit = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("upload_type", 1);
    formData.append("content", croppedImage);
    const res = await handleUploadFile(formData); //uploadContentFileAPI(formData);
    if (res?.status === 200) {
      const { url = null, key_name = "" } = res?.data || {};
      setImage(res?.data ?? {});
      onChange({ url, key_name, name: selectedFile?.name });
      handleSetModal();
    } else {
      setSelectedFile(null);
      fileRef.current.value = null;
      errorMessage(res);
    }
    setLoader(false);
  };

  const imageUploader = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    setOpenModal(true);
    setSelectedFile(event.target.files[0]);
    onChange(event.target.files);
  };

  const handleInputClear = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    fileRef.current.value = null;
    onChange(null);
  };

  const handleCancelSelection = () => {
    fileRef.current.value = null;
    setSelectedFile(null);
    setOpenModal(false);
  };

  return (
    <FileUploadField hasError={error}>
      <input
        ref={fileRef}
        accept="image/*" //, video/*
        id={`contained-button-file+${name}`}
        multiple
        type="file"
        onChange={imageUploader}
      />
      <label
        htmlFor={`contained-button-file+${name}`}
        className="cover-art-label"
      >
        {selectedFile ? (
          <div className="image-section">
            {/* {selectedFile?.name || selectedFile} */}
            <img
              src={image?.url ?? selectedFile}
              width="auto"
              height="100%"
              alt=""
            />
            <span className="clear-icon" onClick={handleInputClear}>
              &#x2715;
            </span>
          </div>
        ) : (
          <div className="label-section">
            <div variant="gray_title">
              {props?.placeholder ?? "Upload Images"}
            </div>
            <ContentUploadIcon />
          </div>
        )}
      </label>
      {openModal && (
        <SimpleModal
          openModal={openModal}
          setOpenModal={handleSetModal}
          maskClosable={false}
        >
          <CropperWrapper className="cropper-wrapper">
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                // onCropAreaChange={setCroppedArea}
                style={{ containerClassName: "cropper-container" }}
              />
            </div>
            <div className="cropper-submit-btn">
              <Button
                onClick={handleSubmit}
                text="Submit"
                height="40px"
                width="90px"
                loading={loader}
              />
              <Button
                onClick={handleCancelSelection}
                text="Cancel"
                height="40px"
                width="90px"
                // loading={loader}
              />
            </div>
          </CropperWrapper>
        </SimpleModal>
      )}
      {error && <div variant="error-content">{helperText}</div>}
    </FileUploadField>
  );
};
export default CustomizeFileUpload;

const CropperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .cropper {
    height: 450px;
    position: relative;
  }
  .cropper-submit-btn {
    text-align: right;
  }
`;

const FileUploadField = styled.div`
  color: ${theme.greyText};
  input {
    display: none !important;
  }
  label {
    cursor: pointer;
    position: relative;
  }
  .image-section {
    height: 150px;
    padding: 2px;
    display: flex;
    justify-content: center;
    background: ${theme.backgroundGray};
  }
  .label-section {
    border-radius: 6px;
    background: ${theme.backgroundGray};
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 12px;
  }
  .clear-icon {
    position: absolute;
    right: 8px;
  }
`;

const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        img,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      // const url = canvas.toDataURL("image/jpeg");
      // console.log("check url", url);
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};
