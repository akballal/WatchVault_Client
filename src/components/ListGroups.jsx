import { MouseEvent, useState } from "react";


function ListGroups({ items, heading, onSelectItem }) {
  //Event Handling
  // const handleEvent = (event: MouseEvent) => {
  //   console.log(event);
  //   const target = event.target as HTMLElement;
  //   console.log(target.innerHTML);
  // };

  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>{heading}</h1>
      {/*conditional handling (true && ANY_VALUE = ANY_VALUE) */}
      {items.length === 0 && <p>No item to display</p>}{" "}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroups;
