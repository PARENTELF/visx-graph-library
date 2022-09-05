import AxisX, { AxisXProps } from './AxisXY/AxisX';
import AxisY, { AxisYProps } from './AxisXY/AxisY';

export interface AxisOptions {
  axisXoptions: AxisXProps;
  axisYoptions: AxisYProps;
}

const Axis = (props: AxisOptions) => {
  const {
    axisXoptions,
    axisYoptions: { position: axisYPosition, xMax, yScale },
  } = props;

  console.log('axisYPosition', axisYPosition);

  return (
    <>
      <AxisY xMax={xMax} position={axisYPosition} yScale={yScale} />
      <AxisX
        yMax={axisXoptions.yMax}
        xScale={axisXoptions.xScale}
        left={axisYPosition === 'right' ? -30 : 0}
      />
    </>
  );
};

export default Axis;
