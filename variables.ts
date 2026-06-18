import type {LngLat, YMapLocationRequest} from '@yandex/ymaps3-types';
import type {YMapDefaultMarkerProps} from '@yandex/ymaps3-default-ui-theme';

export const LOCATION: YMapLocationRequest = {
    center: [30.3141, 59.9386], // starting position [lng, lat]
    zoom: 8 // starting zoom
};

export const FIRST_MARKER_PROPS: {iconName: YMapDefaultMarkerProps['iconName']; coordinates: LngLat} = {
    iconName: 'lindul',
    coordinates: [29.5394, 60.2392]
};
export const SECOND_MARKER_PROPS: {iconName: YMapDefaultMarkerProps['iconName']; coordinates: LngLat} = {
    iconName: 'vyborg',
    coordinates: [28.7291, 60.7158]
};
