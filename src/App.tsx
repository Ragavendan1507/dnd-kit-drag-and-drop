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

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

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
        style={{
          ...styles.draggable,
          opacity: isModuleAdded ? 0.5 : 1,
          pointerEvents: isModuleAdded ? 'none' : 'auto',
        }}
        draggable={!isModuleAdded}
        onDragStart={(e) => !isModuleAdded && onDragStart(e, 'Module')}
      >
        Module Node
      </div>

      <div
        style={{
          ...styles.draggable,
          opacity: isModuleAdded ? 1 : 0.5,
          pointerEvents: isModuleAdded ? 'auto' : 'none',
        }}
        draggable={isModuleAdded}
        onDragStart={(e) => isModuleAdded && onDragStart(e, 'Aspect')}
      >
        Aspect Node
      </div>

      <div
        style={{
          ...styles.draggable,
          opacity: selectedAspectId ? 1 : 0.5,
          pointerEvents: selectedAspectId ? 'auto' : 'none',
        }}
        draggable={!!selectedAspectId}
        onDragStart={(e) => selectedAspectId && onDragStart(e, 'Workflow')}
      >
        Workflow Node
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [isModuleAdded, setIsModuleAdded] = useState<boolean>(false);
  const [selectedAspectId, setSelectedAspectId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'Aspect') {
      setSelectedAspectId(node.id);
    }
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');
    if (!nodeType) return;

    if (nodeType === 'Module' && isModuleAdded) return;
    if (nodeType === 'Workflow' && !selectedAspectId) return;

    setNodes((nds) => {
      let newPosition = { x: event.clientX - 250, y: event.clientY - 50 };
      const moduleNode = nds.find((node) => node.type === 'Module');
      const newNode: any = {
        id: `${nds.length + 1}`,
        type: nodeType,
        position: newPosition,
        data: { label: nodeType },
        style: { width: 150 },
        sourcePosition: 'right',
        targetPosition: 'left',
      };
      if (nodeType === 'Aspect' && moduleNode) {
        const aspectNodes = nds.filter((node) => node.type === 'Aspect');
        const aspectSpacing = 100;
        const lastAspect = aspectNodes[aspectNodes.length - 1];

        newPosition = {
          x: moduleNode.position.x + 200,
          y: lastAspect
            ? lastAspect.position.y + aspectSpacing
            : moduleNode.position.y + 100,
        };
        setEdges((eds) => [
          ...eds,
          {
            id: `edge-${moduleNode.id}-${newNode.id}`,
            source: moduleNode.id,
            target: newNode.id,
            type: 'smoothstep',
            sourceHandle: 'right',
            targetHandle: 'left',
          },
        ]);
      }
      if (nodeType === 'Workflow' && selectedAspectId) {
        const aspectNode = nds.find((node) => node.id === selectedAspectId);
        if (aspectNode) {
          const workflowNodes = nds.filter(
            (node) =>
              node.type === 'Workflow' &&
              edges.some(
                (edge) =>
                  edge.source === selectedAspectId && edge.target === node.id,
              ),
          );

          const workflowSpacing = 100;
          newPosition = {
            x: aspectNode.position.x + workflowSpacing,
            y:
              aspectNode.position.y +
              (workflowNodes.length + 1) * workflowSpacing,
          };

          // const workflowSpacing = 100;
          // const lastWorkflow = workflowNodes[workflowNodes.length - 1];

          // newPosition = {
          //   x: aspectNode.position.x,
          //   y: aspectNode.position.y + (workflowNodes.length + 1) * 100,
          // };f
          setEdges((eds) => [
            ...eds,
            {
              id: `edge-${selectedAspectId}-${newNode.id}`,
              source: selectedAspectId,
              target: newNode.id,
              type: 'smoothstep',
              sourceHandle: 'right',
              targetHandle: 'left',
            },
          ]);
        }
      }

      // if (nodeType === 'Workflow' && selectedAspectId) {
      //   const aspectNode = nds.find((node) => node.id === selectedAspectId);
      //   if (aspectNode) {
      //     const workflowNodes = nds.filter(
      //       (node) =>
      //         node.type === 'Workflow' &&
      //         edges.some(
      //           (edge) =>
      //             edge.source === selectedAspectId && edge.target === node.id,
      //         ),
      //     );

      //     const workflowSpacing = 150;
      //     newPosition = {
      //       x: aspectNode.position.x + workflowNodes.length * workflowSpacing,
      //       y: aspectNode.position.y,
      //     };
      //   }
      // }

      const updatedNodes = [...nds, newNode];
      return updatedNodes;
    });

    if (nodeType === 'Module') {
      setIsModuleAdded(true);
    }
  };

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
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodesDraggable={false}
          // panOnDrag={false}
          // zoomOnScroll={false}
          proOptions={{ hideAttribution: true }}
          zoomOnDoubleClick={false}
          fitView
        >
          <Background />
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
