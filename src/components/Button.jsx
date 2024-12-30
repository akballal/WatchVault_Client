function Button({ Buttons, onClick }) {
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
