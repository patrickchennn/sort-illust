// @ts-nocheck

import resizeArray from "./utils/resizeArray";
import shuffleArray from "./utils/shuffleArray";
import algoCategory from "./utils/algoCategory";
// import moreSetting from "./utils/moreSetting";
import setSpeed from './utils/setSpeed';
import { sortedColor } from './utils/colors';
import * as comparasionSort from './utils/sort-algos/comparasionBasedSort';
import * as integerSort from './utils/sort-algos/integerSorts';
import * as dom from "./dom/dom_elements";
import StopWatch from "./utils/StopWatch";
import {
  setRandHeight,
  appendChildRandom,
  adjustInputText,
  delay,
} from "./utils/utilities";


export default function(){
  // // initial array. set all of the array with random height
  for(let i=0; i<Number(dom.sizeRange.value); i++){
    const div = document.createElement("div") as HTMLDivElement;
    setRandHeight(div);
    appendChildRandom(dom.barContainer1,div,i);
  }
  
  dom.sizeInput.value = dom.sizeRange.value;
  adjustInputText(dom.sizeInput,12);
  
  const algoProperties: AlgoProperties = {
    isSorted: false,
    algo:"",
  }
  
  // timer
  var a = document.getElementById("a-timer");
  const aTimer = new StopWatch(a);
  
  resizeArray(dom.barContainer1, dom.sizeRange, dom.sizeInput);
  setSpeed(dom.speedInput,dom.speedVerbose);
  dom.shuffleArrayBtn.addEventListener("click",() => {
    shuffleArray(dom.barContainer1)
    algoProperties.isSorted = false;
    aTimer.reset();

  });
  algoCategory(dom.algoMenu, dom.algoMenuLine, dom.moreAlgoContainer, dom.moreAlgoBtn, dom.moreAlgoPick, algoProperties);
  // moreSetting(dom.moreSettingBtn, dom.moreSettingDisplay, dom.exitBtn,dom.checkBox_List,dom.barContainer1);
  
  
  
  dom.startBtn.addEventListener("click", startAlgo);
  
  async function startAlgo(){
    if(!algoProperties.algo) return;
    if(algoProperties.isSorted) {
      console.log("already sorted!")
      shuffleArray(dom.barContainer1)
      aTimer.reset();
      algoProperties.isSorted = false;
    }

    aTimer.start();
    dom.startBtn.disabled = true;
    dom.shuffleArrayBtn.disabled = true;
    console.log(algoProperties.algo);
    switch(algoProperties.algo){
      case "Bubble":
        await comparasionSort.bubbleSort();
        break;
      case "Insertion":
        await comparasionSort.insertionSort();
        break;
      case "Selection":
        await comparasionSort.selectionSort();
        break;
      case "Merge":
        await comparasionSort.mergeSort();
        break;
      case "Quick (Lomuto Partition)":
        await comparasionSort.quickSortLomuto();
        break;
      case "Heap sort":
        await comparasionSort.heapSort();
        break;
      case "In-place merge sort":
        await comparasionSort.mergeSortInplace();
        break;
      case "Shell sort":
        await comparasionSort.shellSort();
        break;
      case "Coktail shaker sort":
        await comparasionSort.cocktailSort();
        break;
      case "Comb sort":
        await comparasionSort.combSort();
        break;
      case "Cycle sort":
        await comparasionSort.cycleSort();
        break;
      case "Tim sort":
        await comparasionSort.timSort();
        break;
      case "Strand sort":
        // const newArr: Array<HTMLElement> = [];
        const output: HTMLDivElement = document.createElement("div")
        output.classList.add("arr-style");

        dom.arrContainer.appendChild(output)
        await comparasionSort.strandSort(output);
        dom.barContainer1.remove();

        output.classList.add("bar-container-1");

        // last animation
        for(let i=0; i<output.childElementCount; i++){
          const ele = output.children[i] as HTMLElement
          ele.style.backgroundColor = "lightblue";
          await delay(5)
          ele.style.backgroundColor = sortedColor;
        }
        return;
      case "Patience sort":
        await comparasionSort.patienceSort();
        break;
      case "Odd-even sort":
        await comparasionSort.oddEvenSort();
        break;
      case "Gnome sort":
        await comparasionSort.gnomeSort();
        break;
      case "Exchange sort":
        await comparasionSort.exchangeSort();
        break;
      case "LSD Radix sort":
        await integerSort.lsdRadixSort();
        break;
      case "Bogosort":
        await comparasionSort.bogoSort();
        break;
      case "Pancake sort":
        await comparasionSort.pancakeSort();
        break;
      case "Stooge sort":
        await comparasionSort.stoogeSort();
        break;
      case "Slowsort":
        await comparasionSort.slowSort();
        break;
      default:
        return;
      
    }
    
    algoProperties.isSorted = true;
    dom.startBtn.disabled = false;
    dom.shuffleArrayBtn.disabled = false;

    aTimer.stop();
  
    // last animation
    for(let i=0; i<dom.barContainer1.childElementCount; i++){
      const ele = dom.barContainer1.children[i] as HTMLElement
      ele.style.backgroundColor = "lightblue";
      await delay(5)
      ele.style.backgroundColor = sortedColor;
    }
  
  
  }
  
}

interface AlgoProperties{
  isSorted: boolean,
  algo: string,
}