import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { ScaleBand, ScaleLinear } from 'd3-scale';
import { useMemo } from 'react';

import { useId } from 'react';
import Axis, { AxisOptions } from './components/Axis';
import BarChartItem from './components/BarChartItem';

import VerticalLabel from './components/VerticalLabel';

type Props = {
  width: number;
  height: number;
  events?: boolean;
};

const verticalMargin = 120;
const data = [
  {
    label: 'Hydrogen',
    value: 55,
    colors: {
      primary: '#1d1d1c',
      hoover: '#a1a19d',
      innerText: '#ffffff',
    },
  },
  {
    label: 'Helium',
    value: 65,
    colors: {
      primary: '#C5DA00',
      hoover: '#eefc74',
      innerText: '#000000',
    },
  },
  {
    label: 'Carbon',
    value: 10,
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

const getXYMinMax = (width: any, height: any) => {
  const xMax: any = width - margins.left;
  const yMax = height - verticalMargin;

  return [xMax, yMax];
};

const getYScaleDomain = (dataSet: any) => {
  const minValue = Math.min(...dataSet.map((item: any) => item.value));
  const maxValue = Math.max(...dataSet.map((item: any) => item.value));

  return [minValue >= 0 ? 0 : minValue, maxValue];
};

const getXScaleDomain = (dataSet: any) => {
  return dataSet.map((item: any) => item.label!);
};

export function BarChartTest2({ width, height, events = false }: Props) {
  const id = useId();
  const [xMax, yMax] = getXYMinMax(width, height);

  const xScale: ScaleBand<string> = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: getXScaleDomain(data),
        padding: 0.65,
      }),
    [xMax]
  );

  const yScale: ScaleLinear<number, number> = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: getYScaleDomain(data),
      }),
    [yMax]
  );

  const axisOptions: AxisOptions = {
    axisXoptions: {
      yMax,
      xScale,
      left: 0,
    },
    axisYoptions: {
      xMax,
      yScale,
      position: 'right',
    },
  };

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <Group top={verticalMargin / 2} left={margins.left}>
        <BarChartItem data={data} xScale={xScale} yScale={yScale} yMax={yMax} />
        <VerticalLabel yMax={yMax} text={verticalText} />
        <Axis {...axisOptions} />
      </Group>
    </svg>
  );
}
