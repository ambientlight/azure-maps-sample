# azure-maps-sample
A tiny [Azure Maps](https://azure.microsoft.com/en-us/products/azure-maps/) sample that uses web component to define a custom map element. 
The sample consists of a single vanilla javascript [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) `<az-map></az-map>` encapsulating `atlas.Map` control without any additional functionality except with camera state being preserved as route parameters to prevent page reloads from changing map camera.

```html
<body>
  <az-map></az-map>
</body>
```

## Usage

```bash
# install dependencies
npm install

# put your Azure Maps Resource subscription-key into .sub in root folder
echo "YOUR_SUBSCRIPTION_KEY" > .sub

# launch sample
npm run serve
```
