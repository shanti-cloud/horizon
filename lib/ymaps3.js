await ymaps3.ready;

// Импортируем необходимые модули Яндекса
export const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature} = ymaps3;
// Load the package with the hint, extract the class to create the hint object  and the hint context
const {YMapHint, YMapHintContext} = await ymaps3.import('@yandex/ymaps3-hint');
// Load the package with the default marker, extract the class to create the default marker object
const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

