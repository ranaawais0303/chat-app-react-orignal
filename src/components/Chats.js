import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Chats = (props) => {
  // const [loading, setLoading] = useState(true);
  const history = useHistory();

  const { user } = useAuth();
  console.log(user);

  //////////logout //////////
  const handleLogut = async () => {
    await auth.signOut();
    history.push("/");
  };

  // ////////////image url//////////////////////
  // const getFile = async (url) => {
  //   const response = fetch(url);
  //   const data = await response.blob();

  //   return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  // };

  // /////////useEffect///////////////////\
  // useEffect(() => {
  //   if (!user) {
  //     history.push("/");
  //     return;
  //   }

  //   /////////axios/////////////////////////////
  //   axios
  //     .get("https://api.chatengine.io/users/me", {
  //       headers: {
  //         "project-id": "d28ee836-375c-49da-9e72-56c788741081",
  //         "user-name": user.email,
  //         "user-secret": user.uid,
  //       },
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       let formdata = new FormData();
  //       formdata.append("email", user.email);
  //       formdata.append("username", user.displayName);
  //       formdata.append("secret", user.uid);

  //       //////////////////////////////////////////////////////////////
  //       getFile(user.photoURL).then((avatar) => {
  //         formdata.append("avatar", avatar, avatar.name);
  //         axios
  //           .post("https://api.chatengine.io/users/", formdata, {
  //             headers: {
  //               "private-key": "69581442-f625-41ec-b915-a1a9cbfedc26",
  //             },
  //           })
  //           .then(() => setLoading(false))
  //           .catch((error) => console.log(error));
  //       });
  //     });
  // }, [user, history]);

  ///////////////////////////
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChatApp</div>
        <div onClick={handleLogut} className="logout-tab">
          Logout
        </div>
      </div>
      {/* <ChatEngine
        height="calc(100vh -66px) "
        projectID="d28ee836-375c-49da-9e72-56c788741081"
        userName={user.email}
        userSecret={user.uid}
      /> */}
    </div>
  );
};

export default Chats;
