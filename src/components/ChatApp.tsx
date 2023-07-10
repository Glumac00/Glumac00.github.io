//@ts-nocheck
import './../styles/styles.scss';
import Messages from "./Messages";
import { useEffect, useState } from "react";
import Input from './Input';
type MessageType = {
    member: any;
    text: any;
  };
  
function randomName() {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
    "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
    "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
    "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
    "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


const ChatApp = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
    id: "",
  });
  const [drone, setDrone] = useState<any>(null);

  useEffect(() => {
    const newDrone = new window.Scaledrone("dgfRrSHXS02Ch5Lx", {
      data: member,
    });
    setDrone(newDrone);

    newDrone.on("open", (error: any) => {
      if (error) {
        console.error(error);
        return;
      }
      const updatedMember = { ...member };
      updatedMember.id = newDrone.clientId;
      setMember(updatedMember);
    });

    return () => {
      newDrone.close();
    };
  }, []);

  useEffect(() => {
    if (drone) {
      const room = drone.subscribe("observable-room");
      room.on("data", (data: any, member: any) => {
        const newMessage = { member, text: data };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [drone]);

  const onSendMessage = (message: string) => {
    if (drone) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatApp;


