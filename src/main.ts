import resizeArray from "./utils/resizeArray";
import shuffleArray from "./utils/shuffleArray";
import algoCategory from "./utils/algoCategory";
import moreSetting from "./utils/moreSetting";
import setSpeed from './utils/setSpeed';
import { sortedColor } from './utils/colors';
import * as sort from './utils/sort-algos/comparasionBasedSort';
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
  
  resizeArray(dom.barContainer1, dom.sizeRange, dom.sizeInput);
  setSpeed(dom.speedInput,dom.speedVerbose);
  dom.shuffleArrayBtn.addEventListener("click",() => {
    shuffleArray(dom.barContainer1)
    algoProperties.isSorted = false;
  });
  algoCategory(dom.algoMenu, dom.algoMenuLine, dom.moreAlgoContainer, dom.moreAlgoBtn, dom.moreAlgoPick, algoProperties);
  moreSetting(dom.moreSettingBtn, dom.moreSettingDisplay, dom.exitBtn,dom.checkBox_List,dom.barContainer1);
  
  
  // timer
  var a = document.getElementById("a-timer");
  const aTimer = new StopWatch(a);
  
  dom.startBtn.addEventListener("click", startAlgo);
  
  async function startAlgo(){
    console.log("start shit")
    if(!algoProperties.algo) return;
    if(algoProperties.isSorted) {
      console.log("already sorted!")
      shuffleArray(dom.barContainer1)
      aTimer.reset();
      algoProperties.isSorted = false;
    }

    aTimer.start();
    dom.startBtn.disabled = true;
    console.log(algoProperties.algo);
    switch(algoProperties.algo){
      case "Bubble":
        await sort.bubbleSort();
        break;
      case "Insertion":
        await sort.insertionSort();
        break;
      case "Selection":
        await sort.selectionSort();
        break;
      case "Merge":
        await sort.mergeSort();
        break;
      case "Quick (Lomuto Partition)":
        await sort.quickSortLomuto();
        break;
      case "Heap sort":
        await sort.heapSort();
        break;
      case "In-place merge sort":
        await sort.mergeSortInplace();
        break;
      case "Shell sort":
        await sort.shellSort();
        break;
      case "Coktail shaker sort":
        await sort.cocktailSort();
        break;
      case "Comb sort":
        await sort.combSort();
        break;
      case "Cycle sort":
        await sort.cycleSort();
        break;
      case "Tim sort":
        await sort.timSort();
        break;
      case "Strand sort":
        // const newArr: Array<HTMLElement> = [];
        const output: HTMLDivElement = document.createElement("div")
        output.classList.add("arr-style");

        dom.arrContainer.appendChild(output)
        await sort.strandSort(output);
        dom.barContainer1.remove();

        output.classList.add("bar-container-1");

        // last animation
        for(let i=0; i<output.childElementCount; i++){
          output.children[i].style.backgroundColor = "lightblue";
          await delay(5)
          output.children[i].style.backgroundColor = sortedColor;
        }
        return;
      case "Patience sort":
        await sort.patienceSort();
        break;
      default:
        return;
      
    }
    
    algoProperties.isSorted = true;
    dom.startBtn.disabled = false;
    aTimer.stop();
  
    // last animation
    for(let i=0; i<dom.barContainer1.childElementCount; i++){
      dom.barContainer1.children[i].style.backgroundColor = "lightblue";
      await delay(5)
      dom.barContainer1.children[i].style.backgroundColor = sortedColor;
    }
  
  
  }
  
}

interface AlgoProperties{
  isSorted: boolean,
  algo: string,
}