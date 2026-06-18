import type {LngLat, YMapLocationRequest} from '@yandex/ymaps3-types';
import type {YMapDefaultMarkerProps} from '@yandex/ymaps3-default-ui-theme';

export const LOCATION: YMapLocationRequest = {
    center: [30.3141, 59.9386], // starting position [lng, lat]
    zoom: 8 // starting zoom
};

export const FIRST_MARKER_PROPS: {iconName: YMapDefaultMarkerProps['iconName']; title: YMapDefaultMarkerProps['title']; subtitle: YMapDefaultMarkerProps['subtitle']; coordinates: LngLat} = {
    iconName: 'lindul',
	title: "Линдуловская роща",
    subtitle: "Экотропа среди вековых лиственниц и бурная река Рощинка.",
	topicId: 428,
    coordinates: [29.5394, 60.2392]
};
export const SECOND_MARKER_PROPS: {iconName: YMapDefaultMarkerProps['iconName']; title: YMapDefaultMarkerProps['title']; subtitle: YMapDefaultMarkerProps['subtitle']; coordinates: LngLat} = {
    iconName: 'vyborg',
	title: "Выборгский замок",
    subtitle: "Единственный в России полностью сохранившийся средневековый замок.",
	topicId: 300,
    coordinates: [28.7291, 60.7158]
};
