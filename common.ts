/* Initialize a custom information message control
Assign a value to it after loading the map api */
export let InfoMessage = null;

interface InfoMessageProps {
    text: string;
}

// Wait for the api to load to access the entity system (YMapComplexEntity)
ymaps3.ready.then(() => {
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-default-ui-theme@0.0');

    class InfoMessageClass extends ymaps3.YMapComplexEntity<InfoMessageProps> {
        private _element!: HTMLDivElement;
        private _detachDom!: () => void;

        // Method for create a DOM control element
        _createElement(props: InfoMessageProps) {
            // Create a root element
            const infoWindow = document.createElement('div');
            infoWindow.classList.add('info_window');
            infoWindow.innerHTML = props.text;

            return infoWindow;
        }

        // Method for attaching the control to the map
        _onAttach() {
            this._element = this._createElement(this._props);
            this._detachDom = ymaps3.useDomContext(this, this._element, this._element);
        }

        // Method for detaching control from the map
        _onDetach() {
            this._detachDom();
            this._detachDom = undefined;
            this._element = undefined;
        }
    }
    InfoMessage = InfoMessageClass;
});
