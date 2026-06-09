export const OrderedList = ({ children }) => {
  return (
    <ol className="max-w-5xl mx-auto my-6 pl-8 list-decimal">
      {children}
    </ol>
  );
};
