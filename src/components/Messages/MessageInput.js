import React, { useState, ReactDOM } from "react";
import { useAuth } from "../../context/AuthContext";
import { sendMessage } from "../../firebase";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Picker from "emoji-picker-react";
import "./MessageInput.css";

const MessageInput = ({ roomId }) => {
  ///////////////////use States////////////////
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  //////////handlers////////////////////////////
  const showEditorHandler = () => {
    setShowEditor(!showEditor);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // parse(value);
    if (value.length > 0) sendMessage(roomId, user, value);
    setValue("");
  };

  const changeEditorHandler = (event, editor) => {
    const data = editor.getData();
    // const d = parse(data);
    console.log(data);
    setValue(data);
  };

  const onEmojiClick = (event, emojiObject) => {
    setValue((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  ////////////////////////////////////////////

  //////////////////jsx/////////////////////////
  return (
    <div>
      <form onSubmit={handleSubmit} className="message-input-container">
        {/* <Emoji /> */}

        {showEditor && (
          <div className="app">
            <CKEditor
              editor={ClassicEditor}
              data={value}
              onChange={changeEditorHandler}
            />
          </div>
        )}
        {!showEditor && (
          <div className="picker-container">
            {" "}
            <input
              type="text"
              placeholder="Enter a message"
              value={value}
              onChange={handleChange}
              className="input-style"
              required
              minLength={1}
            />
            <img
              className="emoji-icon"
              src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
              onClick={() => setShowPicker((val) => !val)}
              alt="emoji"
            />
            {showPicker && (
              <Picker
                pickerStyle={{ width: "100%" }}
                onEmojiClick={onEmojiClick}
              />
            )}
          </div>
        )}
        <button type="submit" disabled={value < 1} className="send-message">
          Send
        </button>
        <button className="buttonE" type="button" onClick={showEditorHandler}>
          Editor
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
