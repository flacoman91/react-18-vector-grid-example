import React from "react";
import {Styles} from "../../Leaflet/VectorGrid";
import {useDispatch, useSelector} from "react-redux";
import {
    addVisibleFeatures,
    removeVisibleFeatures,
    selectCounterVisibleFeatures
} from '../counter/counterSlice'

export const MapFeatures = () => {

    const dispatch = useDispatch()
    const visibleFeatures = useSelector(selectCounterVisibleFeatures)

    const handleCheck = (style) => {
        if (visibleFeatures.includes(style)) {
            dispatch(removeVisibleFeatures(style))
        } else {
            dispatch(addVisibleFeatures(style))
        }
    }
    return <div>
        <div>Check/Uncheck features to display</div>
        {Object.keys(Styles).map(style =>
            <div key={style}>
                <input onChange={() => {
                    handleCheck(style)
                }}
                       type={'checkbox'}
                       checked={visibleFeatures.includes(style)}
                />
                {style}
            </div>
        )
        }
    </div>

}