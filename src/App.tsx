import React, { useEffect, useState } from "react";
import FlipHoverEffect from "./components/card/card";

const App: React.FC = () => {
  const array = [1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8, 5, 6, 7, 8];
  const [list, setList] = useState<number[]>([]);
  useEffect(() => {
    function shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledArray = shuffleArray(JSON.parse(JSON.stringify(array)));
    setList(shuffledArray);
  }, []);

  // Example usage:

  const [selection, setSelction] = useState<{
    firstSelect: null | number;
    secondSelect: null | number;
  }>({
    firstSelect: null,
    secondSelect: null,
  });

  const [foundItem, setFoundItem] = useState<number[]>([]);

  const [closeAll, setCloseAll] = useState(false);
  const [openAll, setOpenAll] = useState(false);

  const [disableAllButton, setDisableAllButton] = useState(false);

  useEffect(() => {
    console.log(selection.firstSelect, selection.secondSelect);
    // console.log(foundItem)
    if (selection.firstSelect && selection.secondSelect) {
      setDisableAllButton(true);
      setTimeout(() => {
        setDisableAllButton(false);
      }, 1000);
      if (selection.firstSelect === selection.secondSelect) {
        setFoundItem((prev) => [...prev, selection.firstSelect]);
        setSelction({
          firstSelect: null,
          secondSelect: null,
        });
        setDisableAllButton(false);
      }

      if (selection.firstSelect !== selection.secondSelect) {
        setSelction({
          firstSelect: null,
          secondSelect: null,
        });
        setTimeout(() => {
          setCloseAll((prev) => !prev);
        }, 1000);
      }
    }
  }, [selection]);

  const handleSelection = (newSelect: number): void => {
    // setSelction(newSelect);
    if (selection.firstSelect === null) {
      setSelction({ firstSelect: newSelect, secondSelect: null });
    } else if (selection.firstSelect && selection.secondSelect === null) {
      setSelction((prev) => {
        return { ...prev, secondSelect: newSelect };
      });
    }
  };

  const resetGame = () => {
    setFoundItem([]);
    setSelction({
      firstSelect: null,
      secondSelect: null,
    });
    setDisableAllButton(false);
    function shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledArray = shuffleArray(JSON.parse(JSON.stringify(array)));
    setList(shuffledArray);
    setOpenAll((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-y-8  h-screen bg-[#E5C287]">
      <h1 className="text-lg font-bold"> Javascript Game</h1>
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {list &&
          array.map((item, index) => (
            <FlipHoverEffect
              key={index}
              handleSelection={handleSelection}
              id={item}
              closeAll={closeAll}
              foundItem={foundItem}
              selection={selection}
              isInteractive={disableAllButton}
            />
          ))}
      </div>

      <div className="h-10">
        {8 === foundItem.length && (
          <button
            type="button"
            onClick={() => resetGame()}
            className="font-bold text-[#E8751A] border py-2 px-4 border-[#898121] flex gap-x-2 items-center"
          >
            <span>play again</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="#898121"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M22 12c0 5.52-4.48 10-10 10s-8.89-5.56-8.89-5.56m0 0h4.52m-4.52 0v5M2 12C2 6.48 6.44 2 12 2c6.67 0 10 5.56 10 5.56m0 0v-5m0 5h-4.44"
                ></path>
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
