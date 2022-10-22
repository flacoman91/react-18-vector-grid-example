import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeMapType,
  changeMarkerVisibility,
  selectCounterMapType,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const mapType = useSelector(selectCounterMapType);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        Current Map type <span className={styles.value}>{mapType}</span>
        <button
          className={styles.button}
          onClick={() => dispatch(changeMapType('mapbox'))}
        >
          Mapbox
        </button>

        <button
          className={styles.button}
          onClick={() => dispatch(changeMapType('nextzen'))}
        >
          Nextzen
        </button>

        <button
            className={styles.button}
            onClick={() => dispatch(changeMarkerVisibility())}
        >
          Hide/show marker
        </button>
      </div>
    </div>
  );
}
