export const OrderedListItem = ({ content, children }) => {
  const contentBeforeNestedList = content?.split("<ol")[0];

  return (
    <li className="mb-2">
      <span
        dangerouslySetInnerHTML={{ __html: contentBeforeNestedList }}
      />
      {children}
    </li>
  );
};