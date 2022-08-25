import React, { useState } from "react";
import "./Emoji.css";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const Emoji = (props) => {
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  ////////////////////change input handler//////////
  const emojiChangeHandler = (e) => {
    setInput(e.target.value);
  };

  ////////////show hide emoji/////////////////
  const emojiShowHide = () => {
    setShowEmojis(!showEmojis);
  };

  /////////add emoji's///////////////////
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div className="emo">
      <button className="button" onClick={emojiShowHide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <input
        value={input}
        onChange={emojiChangeHandler}
        type="text"
        placeholder="emoji picker demo"
      />
      {showEmojis && (
        <div>
          <Picker onSelect={addEmoji} />
        </div>
      )}
    </div>
  );
};

export default Emoji;
