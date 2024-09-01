import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";

const Home = () => {
  return (
    /*Glass effect*/
    <div className="flex sm:h-[450px] md:h-[500px] overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/*sidebar*/}
      <Sidebar />

      {/*MessageContainer*/}
      <MessageContainer />
    </div>
  );
};

export default Home;
