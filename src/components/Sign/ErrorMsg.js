export function ErrorMsg(props) {
  const { isCorrect, text, cssName } = props;

  if (!isCorrect) {
    return <p className={cssName}>{text}</p>;
  }
  return <></>;
}
