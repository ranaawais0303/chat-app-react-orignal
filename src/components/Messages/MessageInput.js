import React, { useState, ReactDOM } from "react";
import { useAuth } from "../../context/AuthContext";
import { sendMessage } from "../../firebase";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./MessageInput.css";
import parse from "html-react-parser";

const MessageInput = ({ roomId }) => {
  ///////////////////use States////////////////
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [text, setText] = useState("");

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

  ////////////////////////////////////////////

  //////////////////jsx/////////////////////////
  return (
    <>
      <form onSubmit={handleSubmit} className="message-input-container">
        {/* <Emoji /> */}

        <button onClick={showEditorHandler}>editor</button>
        {showEditor && (
          <div className="app">
            <CKEditor
              editor={ClassicEditor}
              data={value}
              onChange={changeEditorHandler}
            />
            {parse(value)}
          </div>
        )}
        {!showEditor && (
          <input
            type="text"
            placeholder="Enter a message"
            value={value}
            onChange={handleChange}
            className="message-input"
            required
            minLength={1}
          />
        )}
        <button type="submit" disabled={value < 1} className="send-message">
          Send
        </button>
      </form>
    </>
  );
};
export default MessageInput;
