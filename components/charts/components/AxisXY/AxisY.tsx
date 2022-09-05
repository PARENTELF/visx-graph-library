import { AxisLeft, AxisRight, TickLabelProps } from '@visx/axis';
import { ScaleLinear } from 'd3-scale';

export type AxisScaleYPosition = 'right' | 'left';

export interface AxisYProps {
  position: AxisScaleYPosition;
  numTicks?: number;
  xMax: number;
  hideTicks?: boolean;
  tickLabelProps?: TickLabelProps<number>;
  yScale: ScaleLinear<number, number>;
}

export interface AxisYOptions {
  numTicks: number;
  left: number;
  top: number;
  hideTicks: boolean;
  tickLabelProps?: TickLabelProps<number>;
  scale: ScaleLinear<number, number>;
}

const defaultAxisOptions: (
  yScale: ScaleLinear<number, number>
) => AxisYOptions = (yScale: ScaleLinear<number, number>) => ({
  position: 'right',
  numTicks: 10,
  left: 0,
  top: 0,
  hideTicks: true,
  scale: yScale.nice(),
});

const AxisY = (props: AxisYProps) => {
  const { xMax, yScale, position } = props;

  const tickLabelProps: any = (e: any) => ({
    fill: '#756f6f',
    // fontWeight: 'bold',
    fontSize: 12,
    textAnchor: 'start',
    x: 5,
    y: (yScale(e) ?? 0) + 3,
  });

  const options: any = {
    ...defaultAxisOptions(yScale),
  };

  // <AxisLeft
  //   scale={yScale.nice()}
  //   numTicks={7}
  //   top={0}
  //   //   left={xMax - 30}
  //   hideTicks={true}
  //   tickLabelProps={tickLabelProps}
  // /

  return position === 'right' ? (
    <AxisRight {...{ ...options, ...{ left: xMax - 30 } }} />
  ) : (
    <AxisLeft {...options} />
  );
};

export default AxisY;
