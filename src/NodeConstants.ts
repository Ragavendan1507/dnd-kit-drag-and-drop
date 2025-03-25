export const INITIAL_NODES: any = [
  {
    id: '1',
    type: 'Module',
    data: {
      label: 'Module',
    },
    style: {
      width: 180,
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 90,
      y: 25,
    },
    width: 180,
    height: 37,
  },
  {
    id: '2',
    type: 'Aspect',
    data: {
      label: 'Aspect',
    },
    style: {
      width: 180,
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 390,
      y: 25,
    },
    width: 180,
    height: 37,
  },
  {
    id: '3',
    type: 'Aspect',
    data: {
      label: 'Aspect',
    },
    style: {
      width: 180,
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 390,
      y: 125,
    },
    width: 180,
    height: 37,
  },
  {
    id: '4',
    type: 'Workflow',
    data: {
      label: 'Workflow',
    },
    style: {
      width: 180,
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 690,
      y: 25,
    },
    width: 180,
    height: 37,
  },
  {
    id: '5',
    type: 'Workflow',
    data: {
      label: 'Workflow',
    },
    style: {
      width: 180,
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 690,
      y: 125,
    },
    width: 180,
    height: 37,
  },
  {
    id: '6',
    type: 'Workflow',
    data: {
      label: 'Workflow',
    },
    style: {
      width: 180,
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 690,
      y: 225,
    },
    width: 180,
    height: 37,
  },
  {
    id: '7',
    type: 'Workflow',
    data: {
      label: 'Workflow',
    },
    style: {
      width: 180,
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 690,
      y: 325,
    },
    width: 180,
    height: 37,
  },
];

export const INITIAL_EDGES: any = [
  {
    id: 'edge-module-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
  {
    id: 'edge-module-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
  },
  {
    id: 'edge-module-4',
    source: '2',
    target: '4',
    type: 'smoothstep',
  },
  {
    id: 'edge-module-4',
    source: '2',
    target: '5',
    type: 'smoothstep',
  },
  {
    id: 'edge-module-4',
    source: '2',
    target: '6',
    type: 'smoothstep',
  },
  {
    id: 'edge-module-4',
    source: '2',
    target: '7',
    type: 'smoothstep',
  },
];
