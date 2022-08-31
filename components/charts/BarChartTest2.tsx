import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { Fragment, useId, useMemo } from 'react';

import classes from '../../styles/Home.module.css';

type Props = {
  width: number;
  height: number;
  events?: boolean;
};

const verticalMargin = 120;
const data = [
  {
    label: 'Hydrogen',
    value: 35,
    colors: {
      primary: '#1d1d1c',
      hoover: '#a1a19d',
      innerText: '#ffffff',
    },
  },
  {
    label: 'Helium',
    value: 25,
    colors: {
      primary: '#C5DA00',
      hoover: '#eefc74',
      innerText: '#000000',
    },
  },
  {
    label: 'Carbon',
    value: 15,
    colors: {
      primary: '#c100da',
      hoover: '#ee6fff',
      innerText: '#000000',
    },
  },
  {
    label: 'Nitrogen',
    value: 10,
    colors: {
      primary: '#bbf7af',
      hoover: '#75f75b',
      innerText: '#000000',
    },
  },
];
const verticalText = `TOP ${data.length} ELEMENTS IN THE ATMOSPHERE`;

const margins = {
  left: 30,
};

const VerticalLabel = (props: any) => {
  const { verticalText, yMax, fontSize } = props;

  return (
    <text
      x={-yMax + 100}
      y='20'
      transform='rotate(-90)'
      fontWeight='bold'
      fontSize={fontSize ?? 12}
      fill='#131313'
    >
      {verticalText}
    </text>
  );
};

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

const generateHoverStyle = (color: string, idxElement: number) => (
  <style>{`
  .visx-bar  {
      transition: 0.6s;
  }

  .visx-bar:hover:nth-child(${2 * idxElement + 1}) {
      fill: ${color}
  }
`}</style>
);

export function BarChartTest2({ width, height, events = false }: Props) {
  const id = useId();
  const xMax: any = width - margins.left;
  const yMax = height - verticalMargin;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map((item) => item.label!),
        padding: 0.65,
      }),
    [xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map((item) => item.value))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <Group
        className={classes.mon_test}
        top={verticalMargin / 2}
        left={margins.left}
      >
        {data.map((d, idx) => {
          const domainLabel = d.label!;

          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d.value) ?? 0);

          const barX = xScale(domainLabel);
          const barY = yMax - barHeight;

          return (
            <Fragment key={`bar_container-${idx}-${id}`}>
              <Bar
                x={barX}
                y={barY}
                rx='5'
                ry='5'
                width={barWidth}
                height={barHeight}
                fill={d.colors.primary}
                onClick={() => {
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                }}
              >
                {generateHoverStyle(d.colors.hoover, idx)}
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

        <VerticalLabel yMax={yMax} verticalText={verticalText} />
        <AxisLeft
          scale={yScale.nice()}
          numTicks={7}
          top={0}
          left={xMax - 30}
          hideTicks={true}
          tickLabelProps={(e) => ({
            fill: '#756f6f',
            // fontWeight: 'bold',
            fontSize: 12,
            textAnchor: 'start',
            x: 5,
            y: (yScale(e) ?? 0) + 3,
          })}
        />
        <AxisBottom
          numTicks={data.length}
          top={yMax}
          left={-30}
          scale={xScale}
          hideTicks={true}
          tickLabelProps={(e) => {
            console.log(e);

            return {
              transform: 'translate(30,0)',
              fill: '#756f6f',
              fontSize: 12,
              fontWeight: 'bold',
              textAnchor: 'start',
              x: xScale(e),
            };
          }}
        />
      </Group>
    </svg>
  );
}
