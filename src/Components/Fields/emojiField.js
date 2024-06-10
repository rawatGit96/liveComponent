import Picker from "emoji-picker-react";
import { useState } from "react";
import styled from "styled-components";
import InputComponent from "./input";
import { SendOutlined, SmileFilled } from "@ant-design/icons";

function EmojiField({ value = "" }) {
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState(value);

  const onEmojiClick = (emojiData) => {
    const data = input + emojiData.emoji;
    setInput(data);
    setShowPicker(false);
  };

  const handleInput = (e) => {
    setInput(e?.target?.value);
  };

  return (
    <EmojiFieldWrapper>
      <div className="flex-wrap">
        <InputComponent value={input} onChange={handleInput} />
        <SmileFilled
          className="emoji-icon"
          onClick={() => setShowPicker((val) => !val)}
        />
        <SendOutlined className="send-icon" />
      </div>
      {showPicker && (
        <Picker className="input-emoji-picker" onEmojiClick={onEmojiClick} />
      )}
    </EmojiFieldWrapper>
  );
}

export default EmojiField;

const EmojiFieldWrapper = styled.div`
  .flex-wrap {
    position: relative;
    margin-bottom: 5px;
  }
  .emoji-icon {
    position: absolute;
    bottom: 9px;
    left: 7px;
    cursor: pointer;
  }
  .EmojiPickerReact {
    width: 100% !important;
    height: 400px;
  }
  .input-field {
    padding-left: 25px;
  }
  .send-icon {
    margin-left: 8px;
  }
`;
