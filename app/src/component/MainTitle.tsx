interface Props {
  text: string;
  className?: string;
}

function MainTitle({ text, className = "" }: Props) {
  return (
    <h1 className={`text-4xl md:text-5xl text-forest-green font-literata font-bold mb-6 ${className}`}>
      {text}
    </h1>
  );
}

export default MainTitle;
