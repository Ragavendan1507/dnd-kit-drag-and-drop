import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const Sidebar: React.FC<{
  isGrandParentAdded: boolean;
  selectedParentId: string | null;
}> = ({ isGrandParentAdded, selectedParentId }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    if (nodeType === 'GrandParent' && isGrandParentAdded) return;
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={styles.sidebar}>
      <h3>Drag Nodes</h3>

      <div
        style={{
          ...styles.draggable,
          opacity: isGrandParentAdded ? 0.5 : 1,
          pointerEvents: isGrandParentAdded ? 'none' : 'auto',
        }}
        draggable={!isGrandParentAdded}
        onDragStart={(e) =>
          !isGrandParentAdded && onDragStart(e, 'GrandParent')
        }
      >
        GrandParent Node
      </div>

      <div
        style={{
          ...styles.draggable,
          opacity: isGrandParentAdded ? 1 : 0.5,
          pointerEvents: isGrandParentAdded ? 'auto' : 'none',
        }}
        draggable={isGrandParentAdded}
        onDragStart={(e) => isGrandParentAdded && onDragStart(e, 'Parent')}
      >
        Parent Node
      </div>

      <div
        style={{
          ...styles.draggable,
          opacity: selectedParentId ? 1 : 0.5,
          pointerEvents: selectedParentId ? 'auto' : 'none',
        }}
        draggable={!!selectedParentId}
        onDragStart={(e) => selectedParentId && onDragStart(e, 'Child')}
      >
        Child Node
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [isGrandParentAdded, setIsGrandParentAdded] = useState<boolean>(false);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, type: 'step' }, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'Parent') {
      setSelectedParentId(node.id);
    }
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');
    if (!nodeType) return;

    if (nodeType === 'GrandParent' && isGrandParentAdded) return;
    if (nodeType === 'Child' && !selectedParentId) return;

    setNodes((nds) => {
      let newPosition = { x: event.clientX - 250, y: event.clientY - 50 };
      const grandParentNode = nds.find((node) => node.type === 'GrandParent');

      if (nodeType === 'Parent' && grandParentNode) {
        const parentNodes = nds.filter((node) => node.type === 'Parent');
        const parentSpacing = 200;
        newPosition = {
          x:
            grandParentNode.position.x +
            (parentNodes.length + 1) * parentSpacing,
          y: grandParentNode.position.y + 150,
        };
      }

      if (nodeType === 'Child' && selectedParentId) {
        const parentNode = nds.find((node) => node.id === selectedParentId);
        if (parentNode) {
          const childNodes = nds.filter(
            (node) =>
              node.type === 'Child' &&
              edges.some(
                (edge) =>
                  edge.source === selectedParentId && edge.target === node.id,
              ),
          );

          const childSpacing = 150;
          newPosition = {
            x: parentNode.position.x + childNodes.length * childSpacing,
            y: parentNode.position.y + 150,
          };
        }
      }

      const newNode: Node = {
        id: `${nds.length + 1}`,
        type: nodeType,
        position: newPosition,
        data: { label: nodeType },
      };

      const updatedNodes = [...nds, newNode];

      if (nodeType === 'Parent' && grandParentNode) {
        setEdges((eds) => [
          ...eds,
          {
            id: `edge-${grandParentNode.id}-${newNode.id}`,
            source: grandParentNode.id,
            target: newNode.id,
            type: 'step',
          },
        ]);
      }

      if (nodeType === 'Child' && selectedParentId) {
        setEdges((eds) => [
          ...eds,
          {
            id: `edge-${selectedParentId}-${newNode.id}`,
            source: selectedParentId,
            target: newNode.id,
            type: 'step',
          },
        ]);
      }

      return updatedNodes;
    });

    if (nodeType === 'GrandParent') {
      setIsGrandParentAdded(true);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        isGrandParentAdded={isGrandParentAdded}
        selectedParentId={selectedParentId}
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
          proOptions={{ hideAttribution: true }}
          // panOnDrag={false}
          // zoomOnScroll={false}
          fitView
        >
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
    height: '100vh',
  },
};

export default App;
