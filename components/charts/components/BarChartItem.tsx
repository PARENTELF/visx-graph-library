import { Bar } from '@visx/shape';
import { ScaleBand, ScaleLinear } from 'd3-scale';
import { Fragment, useId } from 'react';

const BarInnerText = (props: any) => {
  const { barX, barWidth, barY, barHeight, item } = props;

  return (
    <text
      x={`${barX! + barWidth / 2}`}
      y={`${barY! + barHeight / 2}`}
      fontSize={9}
      fontWeight='bold'
      fill={item.colors.innerText}
      dominantBaseline='middle'
      textAnchor='middle'
    >
      <tspan x={`${barX! + barWidth / 2}`}>{`${item.value}%`}</tspan>
      <tspan x={`${barX! + barWidth / 2}`} dy='1.2em'>
        {item.label}
      </tspan>
    </text>
  );
};

const addHoverStyle = (color: string, idxElement: number) => (
  <style>{`
    .visx-bar  {
        transition: 0.6s;
    }
  
    .visx-bar:hover:nth-child(${2 * idxElement + 1}) {
        fill: ${color}
    }
  `}</style>
);

const getBarWidthAndHeight = (
  xScale: ScaleBand<string>,
  yScale: ScaleLinear<number, number>,
  value: number
) => {
  const barWidth = xScale.bandwidth();

  const [yMin] = yScale.domain();
  const barHeight = Math.abs(
    yScale(value)! - (value > 0 ? yScale(Math.max(0, +yMin)) : yScale(0))!
  );

  return [barWidth, barHeight];
};

const getBarXY = (
  xScale: ScaleBand<string>,
  yScale: ScaleLinear<number, number>,
  yMax: number,
  value: number,
  label: string
) => {
  const barX = xScale(label);
  const barY = value > 0 ? yMax - (yMax - (yScale(value) ?? 0)) : yScale(0);

  return [barX, barY];
};

const BarChartItem = (props: any) => {
  const id = useId();
  const { data, xScale, yScale, yMax } = props;

  return (
    <>
      {data.map((d: any, idx: number) => {
        const { value, label } = d;
        const [barX, barY] = getBarXY(xScale, yScale, yMax, value, label);
        const [barWidth, barHeight] = getBarWidthAndHeight(
          xScale,
          yScale,
          value
        );

        return (
          <Fragment key={`bar_container-${idx}-${id}`}>
            <Bar
              rx='5'
              ry='5'
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={d.colors.primary}
              onClick={() => {
                alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            >
              {addHoverStyle(d.colors.hoover, idx)}
            </Bar>
            <BarInnerText
              barX={barX}
              barWidth={barWidth}
              barY={barY}
              barHeight={barHeight}
              item={d}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default BarChartItem;
