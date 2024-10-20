import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  roundness: number;
  size: number;
  segmentWidth: number;
  segmentBorderWidth: number;
  data: {
    amount: number;
    id: string;
    color: string;
  }[];
};

function CircleGraph({ size, segmentBorderWidth, segmentWidth, data, roundness }: Props) {
  const formatData = (
    data: {
      amount: number;
      id: string;
      color: string;
    }[]
  ) => {
    const amountToDegreeCooeftient = data.reduce((accumlator, object) => (accumlator += object.amount), 0) / Math.PI;
    let currentDegree = 0;
    const formatedData = data.map((object) => {
      const startDegree = currentDegree;
      const endDegree = object.amount / amountToDegreeCooeftient + startDegree;
      currentDegree = endDegree;
      return { start: startDegree, end: endDegree, color: object.color, id: object.id };
    });
    return formatedData;
  };
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [boundingRectParent, setBoundingRectParent] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (boxRef.current) {
      const boundingRect = boxRef.current.getBoundingClientRect();
      setBoundingRectParent(boundingRect);
    }
  }, [boxRef]);
  const formatedData = formatData(data);
  const width = size;
  const hight = width / 2;
  const outerRadius = hight;
  const innerRaduis = hight - segmentWidth;
  const [hoveredSegmentCenterPoint, setHoveredSegmentCenterPoint] = useState<{ x: number; y: number }>({ x: width / 2, y: hight / 2 });
  const Segments = formatedData
    .slice()
    .sort((a, b) => {
      if (a.id === hoveredSegmentId) {
        return 1; // a should come before b
      }
      if (b.id === hoveredSegmentId) {
        return -1; // b should come before a
      }

      return 0; // If neither has the target id, keep their original order
    })
    .map((segment) => {
      const controlPoint1 = { x: Math.cos(segment.start) * innerRaduis + width / 2, y: hight - Math.sin(segment.start) * innerRaduis }; // First corner (top-left)
      const controlPoint2 = { x: Math.cos(segment.end) * innerRaduis + width / 2, y: hight - Math.sin(segment.end) * innerRaduis };
      const controlPoint3 = { x: Math.cos(segment.end) * outerRadius + width / 2, y: hight - Math.sin(segment.end) * outerRadius };
      const controlPoint4 = { x: Math.cos(segment.start) * outerRadius + width / 2, y: hight - Math.sin(segment.start) * outerRadius };

      const point1I = {
        x: Math.cos(segment.start) * (innerRaduis + roundness) + width / 2,
        y: hight - Math.sin(segment.start) * (innerRaduis + roundness),
      };

      const point1II = {
        x: Math.cos(segment.start + roundness / innerRaduis) * innerRaduis + width / 2,
        y: hight - Math.sin(segment.start + roundness / innerRaduis) * innerRaduis,
      }; // First corner (top-left)

      const point2I = {
        x: Math.cos(segment.end - roundness / innerRaduis) * innerRaduis + width / 2,
        y: hight - Math.sin(segment.end - roundness / innerRaduis) * innerRaduis,
      };
      const point2II = {
        x: Math.cos(segment.end) * (innerRaduis + roundness) + width / 2,
        y: hight - Math.sin(segment.end) * (innerRaduis + roundness),
      };

      const point3I = {
        x: Math.cos(segment.end) * (outerRadius - roundness) + width / 2,
        y: hight - Math.sin(segment.end) * (outerRadius - roundness),
      };
      const point3II = {
        x: Math.cos(segment.end - roundness / outerRadius) * outerRadius + width / 2,
        y: hight - Math.sin(segment.end - roundness / outerRadius) * (outerRadius - roundness / outerRadius),
      };
      const point4I = {
        x: Math.cos(segment.start + roundness / outerRadius) * outerRadius + width / 2,
        y: hight - Math.sin(segment.start + roundness / outerRadius) * outerRadius,
      };
      const point4II = {
        x: Math.cos(segment.start) * (outerRadius - roundness) + width / 2,
        y: hight - Math.sin(segment.start) * (outerRadius - roundness),
      };
      return (
        <motion.path
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2 }}
          onHoverStart={() => {
            setHoveredSegmentId(segment.id);
            const degree = (segment.end - segment.start) / 2 + segment.start;
            setHoveredSegmentCenterPoint({
              x: Math.cos(degree) * (innerRaduis + (outerRadius - innerRaduis) / 2) + width / 2,
              y: hight - Math.sin(degree) * (innerRaduis + (outerRadius - innerRaduis) / 2),
            });
          }}
          onHoverEnd={() => {
            setHoveredSegmentId(null);
          }}
          onTouchStart={() => {
            setHoveredSegmentId(segment.id);
            const degree = (segment.end - segment.start) / 2 + segment.start;
            setHoveredSegmentCenterPoint({
              x: Math.cos(degree) * (innerRaduis + (outerRadius - innerRaduis) / 2) + width / 2,
              y: hight - Math.sin(degree) * (innerRaduis + (outerRadius - innerRaduis) / 2),
            });
          }}
          onTouchEnd={() => {
            setHoveredSegmentId(null);
          }}
          key={segment.id}
          style={{ transformOrigin: "100px 100px", outline: "none", border: "none", boxShadow: "none" }} // Scale from the center
          d={`M ${point1I.x} ${point1I.y} Q ${controlPoint1.x} ${controlPoint1.y} ${point1II.x} ${point1II.y} A ${innerRaduis} ${innerRaduis} 0 0 0 ${point2I.x} ${point2I.y} Q ${controlPoint2.x} ${controlPoint2.y} ${point2II.x} ${point2II.y}  L ${point3I.x} ${point3I.y} Q${controlPoint3.x} ${controlPoint3.y} ${point3II.x} ${point3II.y}  A ${outerRadius} ${outerRadius} 0 0 1 ${point4I.x} ${point4I.y} Q ${controlPoint4.x} ${controlPoint4.y} ${point4II.x} ${point4II.y} Z  `}
          fill={segment.color}
          stroke="#F8FBFD"
          strokeWidth={segmentBorderWidth}
        />
      );
    });

  const parentSizeMultipler = (boundingRectParent?.width || 0) / width;
  return (
    <div className=" select-none  relative" ref={boxRef}>
      <motion.div
        className=" absolute p-4 rounded-lg select-none bg-slate-200 shadow-md  pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          top: hoveredSegmentCenterPoint.y * parentSizeMultipler,
          left: hoveredSegmentCenterPoint.x * parentSizeMultipler,
          opacity: !!hoveredSegmentId ? 1 : 0,
        }}
      >
        {data.find((object) => object.id === hoveredSegmentId)?.amount}
      </motion.div>
      <motion.svg
        viewBox={`0 0 ${width} ${hight}`}
        width={"100%"}
        height={"100%"}
        style={{ border: "0px solid transparent" }}
        className={" overflow-visible"}
      >
        {Segments}
      </motion.svg>
    </div>
  );
}

export default CircleGraph;
