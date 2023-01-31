import { control, Map, ControlPosition, setDomain, source, Shape, data, layer, AuthenticationType } from 'azure-maps-control'
const StyleControl = control.StyleControl;
const DataSource = source.DataSource;
const BubbleLayer = layer.BubbleLayer;

// imports resolved css inside az-map
require('../node_modules/azure-maps-control/dist/atlas.css');

class MapComponent extends HTMLElement {
  map: Map

  constructor(){
    super()
    this.attachShadow({ mode: 'open' })
    const resolvedStyles = Array.from(this.querySelectorAll("style"));
    this.shadowRoot.append(...resolvedStyles)
    this.mapInit()
  }

  mapInit(){
    let inner: HTMLElement = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '100%'
    this.shadowRoot.appendChild(inner)
  
    const authOptions = ENVIRONMENT.azureSubscriptionKey !== undefined 
      ? { authType: AuthenticationType.subscriptionKey, subscriptionKey: ENVIRONMENT.azureSubscriptionKey }
      : undefined;

    this.map = new Map(inner, {
      authOptions,
      center: [-122.13949398, 47.64628823],
      zoom: 19
    })

    this.loadState()
    window.onpopstate = (event) => this.loadState();
    this.map.events.add('dragend', () => this.updateState())
    this.map.events.add('pitchend', () => this.updateState())
    this.map.events.add('zoomend', () => this.updateState())
    this.map.events.add('ready', event => {})

    this.map.controls.add(
      new StyleControl({ mapStyles: 'all' }), 
      { position: ControlPosition.TopRight }
    )
  }

  loadState(){
    const params = new URLSearchParams(window.location.search);
    const latStr = params.get('lat') || "47.62"
    const lngStr = params.get('lng') || "-122.335"
    const pitchStr = params.get('pitch') || "0"
    const bearingStr = params.get('bearing') || "0"
    const zoomStr = params.get('zoom') || "12"
    this.map.setCamera({
      center: [parseFloat(lngStr), parseFloat(latStr)],
      zoom: parseFloat(zoomStr),
      pitch: parseFloat(pitchStr),
      bearing: parseFloat(bearingStr)
    });
  }

  updateState(){
    window.history.pushState('', 'Azure Maps Sample',
      `?lng=${this.map.getCamera().center[0]}` +
      `&lat=${this.map.getCamera().center[1]}` +
      `&pitch=${this.map.getCamera().pitch}` +
      `&bearing=${this.map.getCamera().bearing}` +
      `&zoom=${this.map.getCamera().zoom}`
    )
  }

  // 121.5, 25 for taipei
  flyTo(location: [number, number], zoom: number){
    this.map["map"].flyTo({ center: location, zoom })
  }

  addSampleBubble(){
    const datasource = new DataSource('bubble-source');
    datasource.setShapes([new Shape(new data.Point([-122.335, 47.62]))]);
    this.map.sources.add(datasource);
    this.map.layers.add(new BubbleLayer(datasource, 'bubble', {
      radius: 10,
      color: 'cyan'
    }));
  }
}

customElements.define("az-map", MapComponent)