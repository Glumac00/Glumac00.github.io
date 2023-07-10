import { useState } from "react";

type InputType = {
    onSendMessage: (text: string) => void;
}

const Input = ({ onSendMessage }: InputType) => {
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    onSendMessage(text);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div className="Input">
      <form onSubmit={onSubmit} className="Input__form">
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Napiši nešto..."
          autoFocus={true}
        />
        <button className="Input__button">Send</button>
      </form>
    </div>
  );
};

export default Input;

