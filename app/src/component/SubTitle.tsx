interface Props {
  text: string;
  className?: string;
}

function SubTitle({ text, className = "" }: Props) {
  return (
    <h2 className={`text-xl md:text-2xl text-warm-amber dark:text-vault-text font-literata font-bold mb-2 ${className}`}>
      {text}
    </h2>
  );
}

export default SubTitle;
