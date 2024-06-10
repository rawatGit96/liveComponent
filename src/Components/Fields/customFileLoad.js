import { font, theme } from "Utils/theme";
import { message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const ratioMessage = {
  1: "Photo (Requirement is 1:1 aspectRatio) (.JPEG. PNG.)",
  14: "Photo (Requirement is 7:4 aspectRatio) (.JPEG. PNG.)",
};

export default function CustomFileLoad({
  onChange,
  className = "",
  id = "",
  note = "",
  ratioType = null,
}) {
  const [selectedfile, setSelectedFile] = useState(null);

  function gcd(u, v) {
    if (u === v) return u;
    if (u === 0) return v;
    if (v === 0) return u;

    if (~u & 1)
      if (v & 1) return gcd(u >> 1, v);
      else return gcd(u >> 1, v >> 1) << 1;

    if (~v & 1) return gcd(u, v >> 1);

    if (u > v) return gcd((u - v) >> 1, v);

    return gcd((v - u) >> 1, u);
  }

  function ratio(w, h) {
    var d = gcd(w, h);
    return [w / d, h / d];
  }

  const handleChange = (event) => {
    // var size = parseFloat(event.target.files[0]);
    // var minSizeKB = 20; //Size in KB.
    // var minSize = minSizeKB * 1024; //File size is returned in Bytes.
    // if (size < minSize)
    //   const msg="size is less than the range"
    // else const msg="cna upload"
    const img = document.createElement("img");
    const objectURL = URL.createObjectURL(event.target.files[0]);
    img.onload = function handleLoad() {
      let a = ratio(img.width, img.height);
      let passCase = ratioType === 14 ? [7, 4] : [1, 1];
      if (a.toString() === passCase.toString()) {
        if (onChange) onChange(event.target.files[0], id);
        setSelectedFile(event.target.files[0]);
      } else {
        const msg = ratioMessage[ratioType] ?? "Not valid aspect Ratio.";
        message.error(msg);
      }
    };
    img.src = objectURL;
  };

  return (
    <CustomFileWrapper className={className}>
      <label htmlFor={"button-file" + id}>CHOOSE FILE</label>
      <input
        accept=".png,.jpg"
        id={"button-file" + id}
        multiple
        type="file"
        onChange={handleChange}
      />
      <div className="file-name">{selectedfile?.name}</div>
      <div className="note">Note : {note}</div>
    </CustomFileWrapper>
  );
}

const CustomFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${theme.greyText};
  .file-name {
    font-size: ${font.small10};
    padding-left: 6px;
  }
  .note {
    font-size: ${font.xsmall};
    padding-left: 6px;
    width: 90%;
  }
  label {
    width: fit-content;
    border-radius: 20px;
    font-size: 12px;
    padding: 8px 15px;
    border: 2px dotted ${theme.greyBorder};
    cursor: pointer;
  }
  input {
    display: none !important;
  }
`;
