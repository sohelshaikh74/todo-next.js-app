const Todo = ({
  id,
  title,
  description,
  mongoId,
  complete,
  deleteTodo,
  completeTodo,
}) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-gray"
      >
        {id + 1}
      </th>
      <td
        className={`${
          complete ? "line-through" : ""
        } px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-gray`}
      >
        {title}
      </td>
      <td
        className={`${
          complete ? "line-through" : ""
        } px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-gray`}
      >
        {description}{" "}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-gray">
        {complete ? "Completed" : "pending"}
      </td>
      <td className="flex gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-gray">
        <button
          className="py-2 px-4 bg-red-500 text-white"
          onClick={() => deleteTodo(mongoId)}
        >
          Delete
        </button>
        {complete ? (
          ""
        ) : (
          <button
            className="py-2 px-4 bg-green-500 text-white"
            onClick={() => completeTodo(mongoId)}
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
