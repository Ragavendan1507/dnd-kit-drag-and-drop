import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  BackgroundVariant,
} from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';
import { INITIAL_EDGES, INITIAL_NODES } from './NodeConstants.ts';

const Sidebar: React.FC<{
  isModuleAdded: boolean;
  selectedAspectId: string | null;
}> = ({ isModuleAdded, selectedAspectId }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    if (nodeType === 'Module' && isModuleAdded) return;
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={styles.sidebar}>
      <h3>Drag Nodes</h3>
      <div
        style={{ ...styles.draggable, opacity: isModuleAdded ? 0.5 : 1 }}
        draggable={!isModuleAdded}
        onDragStart={(e) => !isModuleAdded && onDragStart(e, 'Module')}
      >
        Module Node
      </div>
      <div
        style={{ ...styles.draggable, opacity: isModuleAdded ? 1 : 0.5 }}
        draggable={isModuleAdded}
        onDragStart={(e) => isModuleAdded && onDragStart(e, 'Aspect')}
      >
        Aspect Node
      </div>
      <div
        style={{ ...styles.draggable, opacity: selectedAspectId ? 1 : 0.5 }}
        draggable={!!selectedAspectId}
        onDragStart={(e) => selectedAspectId && onDragStart(e, 'Workflow')}
      >
        Workflow Node
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [isModuleAdded, setIsModuleAdded] = useState<boolean>(false);
  const [selectedAspectId, setSelectedAspectId] = useState<string | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'Aspect') {
      setSelectedAspectId(node.id);
    }
  }, []);

  // const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const nodeType = event.dataTransfer.getData('application/reactflow');
  //   if (!nodeType) return;

  //   if (nodeType === 'Module' && isModuleAdded) return;
  //   if (nodeType === 'Workflow' && !selectedAspectId) return;

  //   setNodes((nds) => {
  //     const newNode: any = {
  //       id: `${nds.length + 1}`,
  //       type: nodeType,
  //       data: { label: nodeType },
  //       style: { width: 180 },
  //       sourcePosition: 'right',
  //       targetPosition: 'left',
  //       position: { x: 0, y: 0 },
  //     };

  //     if (nodeType === 'Module') {
  //       setIsModuleAdded(true);
  //     }

  //     if (nodeType === 'Aspect') {
  //       setEdges((eds) => [
  //         ...eds,
  //         {
  //           id: `edge-module-${newNode.id}`,
  //           source: '1',
  //           target: newNode.id,
  //           type: 'smoothstep',
  //         },
  //       ]);
  //     }

  //     if (nodeType === 'Workflow' && selectedAspectId) {
  //       setEdges((eds) => [
  //         ...eds,
  //         {
  //           id: `edge-${selectedAspectId}-${newNode.id}`,
  //           source: selectedAspectId,
  //           target: newNode.id,
  //           type: 'smoothstep',
  //         },
  //       ]);
  //     }

  //     return [...nds, newNode];
  //   });
  // };

  // const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const nodeType = event.dataTransfer.getData('application/reactflow');
  //   if (!nodeType) return;
  //   let newNode: any = {};
  //   if (nodeType === 'Module' && isModuleAdded) return;
  //   if (nodeType === 'Workflow' && !selectedAspectId) return;
  //   setNodes((nds) => {
  //     if (nodeType === 'Module') {
  //       setIsModuleAdded(true);
  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: nodeType },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 0, y: 25 },
  //       };
  //     }
  //     if (nodeType === 'Aspect') {
  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: nodeType },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 300, y: 25 },
  //       };
  //       setEdges((eds) => [
  //         ...eds,
  //         {
  //           id: `edge-module-${newNode.id}`,
  //           source: '1',
  //           target: newNode.id,
  //           type: 'smoothstep',
  //         },
  //       ]);
  //     }
  //     if (nodeType === 'Workflow' && selectedAspectId) {
  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: nodeType },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 600, y: 25 },
  //       };
  //       setEdges((eds) => [
  //         ...eds,
  //         {
  //           id: `edge-${selectedAspectId}-${newNode.id}`,
  //           source: selectedAspectId,
  //           target: newNode.id,
  //           type: 'smoothstep',
  //         },
  //       ]);
  //     }
  //     return [...nds, newNode];
  //   });
  // };
  // const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const nodeType = event.dataTransfer.getData('application/reactflow');
  //   if (!nodeType) return;

  //   setNodes((nds) => {
  //     let newNode: any = {};

  //     if (nodeType === 'Module') {
  //       if (isModuleAdded) return nds; // Prevent duplicate modules
  //       setIsModuleAdded(true);
  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: nodeType },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 0, y: 25 },
  //       };
  //     } else if (nodeType === 'Aspect') {
  //       const aspectCount = nds.filter((n) => n.type === 'Aspect').length;
  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: nodeType },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 300, y: 25 + aspectCount * 100 }, // Auto-aligning Aspects
  //       };
  //       return [...nds, newNode].map((node) =>
  //         node.id === '1'
  //           ? {
  //               ...node,
  //               edges: [
  //                 ...(node.edges || []),
  //                 {
  //                   id: `edge-module-${newNode.id}`,
  //                   source: '1',
  //                   target: newNode.id,
  //                   type: 'smoothstep',
  //                 },
  //               ],
  //             }
  //           : node,
  //       );
  //     } else if (nodeType === 'Workflow') {
  //       if (!selectedAspectId) return nds; // Ensure a parent Aspect is selected
  //       const workflowCount = nds.filter(
  //         (n) => n.type === 'Workflow' && n.data.parentId === selectedAspectId,
  //       ).length;
  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: nodeType, parentId: selectedAspectId },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 600, y: 25 + workflowCount * 100 }, // Auto-aligning Workflows
  //       };
  //       return [...nds, newNode].map((node) =>
  //         node.id === selectedAspectId
  //           ? {
  //               ...node,
  //               edges: [
  //                 ...(node.edges || []),
  //                 {
  //                   id: `edge-${selectedAspectId}-${newNode.id}`,
  //                   source: selectedAspectId,
  //                   target: newNode.id,
  //                   type: 'smoothstep',
  //                 },
  //               ],
  //             }
  //           : node,
  //       );
  //     }

  //     return [...nds, newNode];
  //   });
  // };
  // const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const nodeType = event.dataTransfer.getData('application/reactflow');
  //   if (!nodeType) return;

  //   let newNode: any = {};
  //   const newEdges: any = [];
  //   setNodes((nds) => {
  //     if (nodeType === 'Module') {
  //       if (isModuleAdded) return nds; // Prevent duplicate Modules
  //       setIsModuleAdded(true);
  //       newNode = {
  //         id: '1',
  //         type: nodeType,
  //         data: { label: 'Module' },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 0, y: 25 },
  //       };
  //     } else if (nodeType === 'Aspect') {
  //       const aspectCount = nds.filter((n) => n.type === 'Aspect').length;
  //       const newNodeId = `${nds.length + 1}`;
  //       newNode = {
  //         id: newNodeId,
  //         type: nodeType,
  //         data: { label: 'Aspect' },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 300, y: 25 + aspectCount * 100 }, // Auto-align Aspects
  //       };
  //       newEdges.push({
  //         id: `edge-module-${newNodeId}`,
  //         source: '1',
  //         target: newNodeId,
  //         type: 'smoothstep',
  //       });
  //     } else if (nodeType === 'Workflow') {
  //       if (!selectedAspectId) return nds; // Ensure an Aspect is selected
  //       const workflowCount = nds.filter(
  //         (n) => n.type === 'Workflow' && n.data.parentId === selectedAspectId,
  //       ).length;
  //       const newNodeId = `${nds.length + 1}`;
  //       newNode = {
  //         id: newNodeId,
  //         type: nodeType,
  //         data: { label: 'Workflow', parentId: selectedAspectId },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 600, y: 25 + workflowCount * 100 }, // Auto-align Workflows
  //       };
  //       newEdges.push({
  //         id: `edge-${selectedAspectId}-${newNodeId}`,
  //         source: selectedAspectId,
  //         target: newNodeId,
  //         type: 'smoothstep',
  //       });
  //     }

  //     return [...nds, newNode];
  //   });

  //   setEdges((eds) => [...eds, ...newEdges]);
  // // };
  // const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const nodeType = event.dataTransfer.getData('application/reactflow');
  //   if (!nodeType) return;

  //   let newNode: any;
  //   const newEdges: any = [];
  //   setNodes((nds) => {
  //     if (nodeType === 'Module') {
  //       if (isModuleAdded) return nds; // Prevent duplicate Modules
  //       setIsModuleAdded(true);
  //       newNode = {
  //         id: '1',
  //         type: nodeType,
  //         data: { label: 'Module' },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 0, y: 25 },
  //       };
  //     } else if (nodeType === 'Aspect') {
  //       const aspectCount = nds.filter((n) => n.type === 'Aspect').length;
  //       const newNodeId = `${nds.length + 1}`;
  //       newNode = {
  //         id: newNodeId,
  //         type: nodeType,
  //         data: { label: 'Aspect' },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 300, y: 25 + aspectCount * 100 }, // Auto-align Aspects
  //       };
  //       newEdges.push({
  //         id: `edge-module-${newNodeId}`,
  //         source: '1',
  //         target: newNodeId,
  //         type: 'smoothstep',
  //       });
  //     } else if (nodeType === 'Workflow') {
  //       if (!selectedAspectId) return nds; // Ensure an Aspect is selected

  //       // Get the y position of the selected Aspect
  //       const parentAspect = nds.find((node) => node.id === selectedAspectId);
  //       const yPosition = parentAspect ? parentAspect.position.y : 25;

  //       const newNodeId = `${nds.length + 1}`;
  //       newNode = {
  //         id: newNodeId,
  //         type: nodeType,
  //         data: { label: 'Workflow', parentId: selectedAspectId },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 600, y: yPosition }, // Align Workflow with its Aspect
  //       };
  //       newEdges.push({
  //         id: `edge-${selectedAspectId}-${newNodeId}`,
  //         source: selectedAspectId,
  //         target: newNodeId,
  //         type: 'smoothstep',
  //       });
  //     }

  //     return [...nds, newNode];
  //   });

  //   setEdges((eds) => [...eds, ...newEdges]);
  // };

  // const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const nodeType = event.dataTransfer.getData('application/reactflow');
  //   if (!nodeType) return;

  //   let newNode: any;
  //   const newEdges: any = [];
  //   setNodes((nds) => {
  //     if (nodeType === 'Module') {
  //       if (isModuleAdded) return nds;
  //       setIsModuleAdded(true);
  //       newNode = {
  //         id: '1',
  //         type: nodeType,
  //         data: { label: 'Module' },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 0, y: 25 },
  //       };
  //     } else if (nodeType === 'Aspect') {
  //       // Get current aspects
  //       const aspects = nds.filter((n) => n.type === 'Aspect');
  //       const lastAspect = aspects[aspects.length - 1];

  //       // Calculate new y-position based on previous aspects' occupied space
  //       const newY = lastAspect ? lastAspect.position.y + 100 : 25;

  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: 'Aspect' },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 300, y: newY },
  //       };

  //       newEdges.push({
  //         id: `edge-module-${newNode.id}`,
  //         source: '1',
  //         target: newNode.id,
  //         type: 'smoothstep',
  //       });
  //     } else if (nodeType === 'Workflow') {
  //       if (!selectedAspectId) return nds;

  //       // Get the selected Aspect
  //       const parentAspect = nds.find((node) => node.id === selectedAspectId);
  //       const aspectY = parentAspect ? parentAspect.position.y : 25;

  //       // Find all existing Workflows under this Aspect
  //       const workflowsUnderAspect = nds.filter(
  //         (node) =>
  //           node.type === 'Workflow' && node.data.parentId === selectedAspectId,
  //       );
  //       const lastWorkflow =
  //         workflowsUnderAspect[workflowsUnderAspect.length - 1];

  //       // New Workflow position: Align to Aspect or stack below existing Workflows
  //       const newY = lastWorkflow ? lastWorkflow.position.y + 100 : aspectY;

  //       newNode = {
  //         id: `${nds.length + 1}`,
  //         type: nodeType,
  //         data: { label: 'Workflow', parentId: selectedAspectId },
  //         style: { width: 180 },
  //         sourcePosition: 'right',
  //         targetPosition: 'left',
  //         position: { x: 600, y: newY },
  //       };

  //       newEdges.push({
  //         id: `edge-${selectedAspectId}-${newNode.id}`,
  //         source: selectedAspectId,
  //         target: newNode.id,
  //         type: 'smoothstep',
  //       });

  //       // Adjust y-position of subsequent Aspects if needed
  //       const occupiedHeight = (workflowsUnderAspect.length + 1) * 100;
  //       setNodes((prevNodes) =>
  //         prevNodes.map((node) => {
  //           if (node.type === 'Aspect' && node.position.y > aspectY) {
  //             return {
  //               ...node,
  //               position: {
  //                 ...node.position,
  //                 y: node.position.y + occupiedHeight - 100,
  //               },
  //             };
  //           }
  //           return node;
  //         }),
  //       );
  //     }

  //     return [...nds, newNode];
  //   });

  //   setEdges((eds) => [...eds, ...newEdges]);
  // };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');
    if (!nodeType) return;

    let newNode: any;
    const newEdges: any = [];
    setNodes((nds) => {
      if (nodeType === 'Module') {
        if (isModuleAdded) return nds;
        setIsModuleAdded(true);
        newNode = {
          id: '1',
          type: nodeType,
          data: { label: 'Module' },
          style: { width: 180 },
          sourcePosition: 'right',
          targetPosition: 'left',
          position: { x: 0, y: 25 },
        };
      } else if (nodeType === 'Aspect') {
        const aspectCount = nds.filter((n) => n.type === 'Aspect').length;
        const newNodeId = `${nds.length + 1}`;
        newNode = {
          id: newNodeId,
          type: nodeType,
          data: { label: 'Aspect' },
          style: { width: 180 },
          sourcePosition: 'right',
          targetPosition: 'left',
          position: { x: 300, y: 25 + aspectCount * 100 },
        };
        newEdges.push({
          id: `edge-module-${newNodeId}`,
          source: '1',
          target: newNodeId,
          type: 'smoothstep',
        });
      } else if (nodeType === 'Workflow') {
        if (!selectedAspectId) return nds;

        const parentAspect = nds.find((node) => node.id === selectedAspectId);
        const aspectYPosition = parentAspect ? parentAspect.position.y : 25;

        const workflowsUnderAspect = nds.filter(
          (node) =>
            node.type === 'Workflow' && node.data.parentId === selectedAspectId,
        );
        const lastWorkflow =
          workflowsUnderAspect[workflowsUnderAspect.length - 1];

        const newYPosition = lastWorkflow
          ? lastWorkflow.position.y + 100
          : aspectYPosition;

        const newNodeId = `${nds.length + 1}`;
        newNode = {
          id: newNodeId,
          type: nodeType,
          data: {
            label: 'Workflow',
            parentId: selectedAspectId,
            extent: parent,
          },
          style: { width: 180 },
          sourcePosition: 'right',
          targetPosition: 'left',
          position: { x: 600, y: newYPosition },
        };
        newEdges.push({
          id: `edge-${selectedAspectId}-${newNodeId}`,
          source: selectedAspectId,
          target: newNodeId,
          type: 'smoothstep',
        });
      }

      return [...nds, newNode];
    });

    setEdges((eds) => [...eds, ...newEdges]);
  }; // working in normal flow scenario

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar
        isModuleAdded={isModuleAdded}
        selectedAspectId={selectedAspectId}
      />
      <div
        style={styles.flowContainer}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={() => {}}
          onNodeClick={onNodeClick}
          nodesDraggable={false}
          proOptions={{ hideAttribution: true }}
          zoomOnDoubleClick={false}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: '250px',
    padding: '10px',
    background: '#fff',
    boxShadow: '2px 0px 5px rgba(0,0,0,0.1)',
  },
  draggable: {
    padding: '10px',
    margin: '5px 0',
    background: '#f0f0f0',
    cursor: 'grab',
    textAlign: 'center',
  },
  flowContainer: {
    flexGrow: 1,
    height: '500px',
    width: '500px',
  },
};

export default App;
