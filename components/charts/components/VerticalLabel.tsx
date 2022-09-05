const VerticalLabel = (props: any) => {
  const { text, yMax, fontSize } = props;

  return (
    <text
      x={-yMax + 100}
      y='20'
      transform='rotate(-90)'
      fontWeight='bold'
      fontSize={fontSize ?? 12}
      fill='#131313'
    >
      {text}
    </text>
  );
};

export default VerticalLabel;
