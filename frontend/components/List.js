export default function List({ items }) {
    return (
      <ul className="border rounded-lg p-4">
        {items.map((item, index) => (
          <li key={index} className="border-b last:border-none py-2">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  