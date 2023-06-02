interface props {
  Buttons: any[];
  onClick: () => void;
}

function handleClickEvent() {
  return;
}

function Button({ Buttons, onClick }: props) {
  return (
    <>
      {Buttons.map((b) => (
        <button
          type="button"
          className={b.classname}
          key={b.name}
          onClick={onClick}
        >
          {b.name}
        </button>
      ))}
    </>
  );
}

export default Button;
