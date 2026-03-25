import { useState, useTransition } from "react";

const LongList = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  text: `Item ${i}`,
}));
const Transition = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(LongList);
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          startTransition(() => {
            const newData = LongList.filter((ele) => {
              return ele.text.includes(value);
            });
            setData(newData);
          });
        }}
      />
      {isPending ? (
        <div>Loading....</div>
      ) : data && data.length > 0 ? (
        <ul>
          {data.map((ele) => (
            <li key={ele.id}>{ele.text}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Transition;
