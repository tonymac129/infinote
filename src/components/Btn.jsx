function Btn({ name, onClick }) {
  return (
    <button className="action-btn" onClick={onClick}>
      {name}
    </button>
  );
}

export default Btn;
