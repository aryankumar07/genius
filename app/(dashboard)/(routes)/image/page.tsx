import ConversationPageBody from "./body";

const ImagePage = () => {

  // this is done to import a server side compenent that is UserAvatar in a 
  // client side component you have to pass it in as a children propery

  return (
    <div>
      <ConversationPageBody/>
    </div>
  )
};

export default ImagePage