


interface ButtonProps {
  onClick?: () => void;
}
export const Button = (props: ButtonProps) => {
  const { onClick } = props;
  const handler = () => {
    console.log("handler button");
  };
  if (!onClick)
    return <button onClick={handler} data-testid="button-test"></button>;
  return (
    <>
      <button onClick={onClick} data-testid="button-test"></button>
    </>
  );
};


