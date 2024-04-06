import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SquareComponent: React.FC<{
  handleSelection: (newSelect: number) => void;
  id: number;
  closeAll: boolean;
  selection: { firstSelect: number | null; secondSelect: number | null };
  foundItem: number[];
  isInteractive: boolean;
  openAll: boolean;
}> = ({
  handleSelection,
  id,
  closeAll,
  foundItem,
  isInteractive,
  selection,
  openAll,
}) => {
  const isFirstRender = useRef(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // useEffect(() => {
  //   console.log("isInteractive", isInteractive);
  // }, [isInteractive]);

  const handleSquareClick = () => {
    if (foundItem.includes(id) || isInteractive) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (foundItem.includes(id)) {
      return;
    }
    setIsFlipped(false);
  }, [closeAll]);


  const handleOnClick = () => {
    if (foundItem.includes(id) || isInteractive) return;
    handleSelection(id);
  };

  return (
    <div style={{ width: 60, height: 60 }} onClick={() => handleOnClick()}>
      <motion.div
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: isFlipped ? "#898121" : "#E8751A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleSquareClick}
      >
        <motion.div
          style={{
            position: "absolute",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backfaceVisibility: "hidden",
            scaleX: isFlipped ? -1 : 1,
          }}
        >
          <div>
            {isFlipped ? (
              <div>{id}</div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17 18.43h-4l-4.45 2.96A.997.997 0 0 1 7 20.56v-2.13c-3 0-5-2-5-5v-6c0-3 2-5 5-5h10c3 0 5 2 5 5v6c0 3-2 5-5 5Z"
                  stroke="#FDA403"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 11.36v-.21c0-.68.42-1.04.84-1.33.41-.28.82-.64.82-1.3 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66M11.995 13.75h.01"
                  stroke="#FDA403"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SquareComponent;
