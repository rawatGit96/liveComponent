import React, { useEffect, useRef, useState } from "react";
import { ContentUploadIcon } from "Utils/svgIcons";
import { styled } from "styled-components";
import { theme } from "Utils/theme";
import { errorMessage } from "Utils/constants";
import ProgressComponent from "./progress";
import uploadFileToS3 from "Services/uploadS3Bucket";

// const video_extensions = [
//   "mpeg-2",
//   "webm",
//   "html5",
//   "mkv",
//   "swf",
//   "f4v",
//   "flv",
//   "avchd",
//   "avi",
//   "wmv",
//   "mov",
//   "mp4",
// ];

const ContentUpload = (props) => {
  const {
    onChange,
    error,
    helperText,
    value = null,
    size = "mid",
    name,
  } = props;
  const [selectedFileUrl, setSelectedFileUrl] = useState(value);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const [fileType, setFileType] = useState(null); // audio or video

  useEffect(() => {
    if (value) {
      const url = value?.url ?? value;
      setFileType(url?.split("/")?.[3]);
    }
  }, [value]);

  const handleUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const contentType = file?.type.split("/")[0];
    setFileType(contentType); // used to set the container height
    const upload_type = contentType === "video" ? 3 : 2;
    const result = await uploadFileToS3(file, setUploadPercent, upload_type);
    if (result?.status === 200) {
      const { url = "", key_name = "" } = result?.data || {};
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const blob = new Blob([arrayBuffer], {
          type: contentType === "video" ? "video/* " : "audio/*",
        });
        const video = document.createElement(contentType);
        video.src = URL.createObjectURL(blob);

        video.onloadedmetadata = () => {
          const { videoWidth, videoHeight, duration } = video;
          const ratio =
            contentType === "video" ? videoWidth / videoHeight : null;
          const output = {
            key_name,
            url,
            ratio,
            duration,
          };
          // Do something with the output, like calling onChange
          onChange(output);
          // Clean up the object URL
          URL.revokeObjectURL(video.src);
        };
        // Start loading the video
        video.load();
      };
      reader.readAsArrayBuffer(event.target.files[0]);

      setSelectedFileUrl(url);
    } else errorMessage(result);
    inputRef.current.value = null;
    setLoading(false);
  };

  console.log("uploadPercent", uploadPercent);
  const handleClearImage = () => {
    videoRef.current.value = null;
    setSelectedFileUrl(null);
    onChange(null);
    onChange(null);
  };

  return (
    <FileUploadField hasError={error} size={size} fileType={fileType}>
      <input
        ref={inputRef}
        accept="video/*, audio/*" //image/* ,
        id={`contained-video-button-file+${name}`}
        multiple
        type="file"
        onChange={handleUpload}
      />
      <>
        {selectedFileUrl === null ? (
          <div className="field-style">
            {uploadPercent > 0 && uploadPercent < 100 ? (
              <div className="percent-loader flex-center">
                <ProgressComponent
                  type="circle"
                  percent={uploadPercent}
                  size={size === "mid" ? "small" : 40}
                />
              </div>
            ) : loading ? (
              <div className="percent-loader flex-center">Loading...</div>
            ) : (
              <label
                htmlFor={`contained-video-button-file+${name}`}
                className="upload-image-label"
              >
                {props?.placeholder ?? "Upload Images"}
                <ContentUploadIcon />
              </label>
            )}
          </div>
        ) : (
          <div className="container">
            <video
              // autoPlay
              ref={videoRef}
              muted
              src={selectedFileUrl}
              loop
              height="100%"
              width="100%"
              controls
              className="video-tag"
              // onLoadedMetadata={handleMetadataLoad}
            />
            <div className="closeIcon" onClick={handleClearImage}>
              &#x2715;
            </div>
          </div>
        )}
      </>
      {error && <div variant="error-content">{helperText}</div>}
    </FileUploadField>
  );
};

export default ContentUpload;

const FileUploadField = styled.div`
  color: ${theme.greyText};
  input {
    display: none !important;
  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 100%;
    width: 100%;
    padding: 0 12px;
    justify-content: ${(props) =>
      props.size === "mid" ? "center" : "space-between"};
    gap: ${(props) => (props.size === "mid" ? "10px" : "0px")};
  }
  .field-style {
    width: 100%;
    background: ${theme.backgroundGray};
    // border: 1px solid
    //   ${(props) => (props.hasError ? theme.primaryColor : "transparent")};
    border-radius: 10px;
    height: ${(props) => (props.size === "mid" ? "140px" : "45px")};
    display: flex;
    justify-content: center;
  }
  .container {
    width: 100%;
    background: ${theme.backgroundGray};
    // border: 1px solid
    //   ${(props) => (props.hasError ? theme.primaryColor : "transparent")};
    border-radius: 10px;
    height: ${(props) => (props.fileType === "video" ? "350px" : "100px")};
    padding: 10px 14px;
    position: relative;
    .video-tag {
      object-fit: contain;
    }
  }
  .closeIcon {
    position: absolute;
    right: 14px;
    top: 6px;
    cursor: pointer;
  }
  .percent-loader {
    height: 100%;
  }
`;
