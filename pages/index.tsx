import type { NextPage } from 'next';

import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { BarChartTest2 } from '../components/charts/BarChartTest2';

import classes from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={classes.container_graph}>
      <div className={classes.graph__content}>
        <label className={classes.graph_label}>
          TOP 5 ELEMENTS IN THE ATMOSPHERE OF JUPITER
        </label>
        <ParentSize>
          {({ width, height }) => (
            <BarChartTest2 width={width} height={height} />
          )}
        </ParentSize>
      </div>
    </div>
  );
};

export default Home;
