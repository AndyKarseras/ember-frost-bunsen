export default {
  containers: [{
    id: 'main',
    rows: [
      [
        {
          model: 'foo',
          properties: {
            cols: 2,
            rows: 4
          },
          renderer: 'textarea'
        }
      ]
    ]
  }],
  rootContainers: [
    {
      container: 'main',
      label: 'Main'
    }
  ],
  type: 'form',
  version: '1.0'
}
