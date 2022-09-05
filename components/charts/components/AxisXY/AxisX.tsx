import { AxisBottom, TickLabelProps } from '@visx/axis';
import { ScaleBand } from 'd3-scale';

export interface AxisXProps {
  numTicks?: number;
  yMax: number;
  hideTicks?: boolean;
  // tickLabelProps?: TickLabelProps<number>;
  xScale: ScaleBand<string>;
  left: number;
}

export interface AxisXOptions {
  numTicks: number;
  left: number;
  top: number;
  hideTicks: boolean;
  tickLabelProps?: TickLabelProps<number>;
  scale: ScaleBand<string>;
}

const AxisX = (props: AxisXProps) => {
  const { numTicks, xScale, yMax, left } = props;

  return (
    <AxisBottom
      numTicks={numTicks}
      top={yMax}
      left={left}
      scale={xScale}
      hideTicks={true}
      tickLabelProps={(e: any) => {
        console.log(e);

        return {
          transform: `translate(${-left},0)`,
          fill: '#756f6f',
          fontSize: 12,
          fontWeight: 'bold',
          textAnchor: 'middle',
          // x: xScale(e),
        };
      }}
    />
  );
};

export default AxisX;
