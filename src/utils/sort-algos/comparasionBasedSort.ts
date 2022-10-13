import { delay, printHTMLCollection,getHeightNode,swapForArr } from "../utilities";
import { unsortedColor,sortedColor } from "../colors";
import { barContainer1,speedInput } from "../../dom/dom_elements";
import { heapify,deleteMaxHeapify } from "./HeapDSMethods";

const arr = barContainer1.children



async function bubbleSort() {
  const howFast: number = Number(speedInput.value);

  let isSwap=false;
  for(let i=0; i<arr.length; i++){
    for(let j=0; j<arr.length-1-i; j++){
      const element_j = arr[j] as HTMLElement;
      const element_j_plus_1 = arr[j+1] as HTMLElement;
      element_j.style.backgroundColor = "yellow";
      element_j_plus_1.style.backgroundColor = "yellow";
      await delay(howFast);

      if(
        getHeightNode(element_j)>getHeightNode(element_j_plus_1)
      ){
        let h: string = element_j_plus_1.style.height;
        element_j_plus_1.style.height = element_j.style.height
        element_j.style.height = h;
        isSwap=true;
      }

      element_j.style.backgroundColor = unsortedColor;
      element_j_plus_1.style.backgroundColor = unsortedColor;
    }
    arr[arr.length-1-i].style.backgroundColor = sortedColor;
    if(isSwap===false) break;
  }
}





async function insertionSort() {
  const howFast: number = Number(speedInput.value);

  for(let i=1; i<arr.length; i++){
    const element_i = arr[i] as HTMLElement;
    let j: number = i-1;
    let key: number = 0;
    let currVal: number = getHeightNode(element_i);
    while(
      j>=0 && 
      currVal<getHeightNode(arr[j] as HTMLElement)
    ){
      // element to be compared  
      arr[j+1].style.backgroundColor = "yellow";
      arr[j].style.backgroundColor = "yellow";
      await delay(howFast);

      swapForArr(arr,j,j+1);

      key = j;
      j--;
      for(let k=i; k>=0; k--){
        arr[k].style.backgroundColor = sortedColor;
      }
    }
    element_i.style.backgroundColor = sortedColor;
  }
}





async function selectionSort() {
  const howFast: number = Number(speedInput.value);

  for(let i=0; i<arr.length-1; i++){
    let minIdx = i;
    // selected element
    arr[i].style.backgroundColor = "yellow";
    await delay(howFast);

    for(let j=i+1; j<arr.length; j++){
      
      // element to be compared
      arr[j].style.backgroundColor = "yellow";
      await delay(howFast);
      
      if(
        getHeightNode(arr[j])<getHeightNode(arr[minIdx])
      ) minIdx = j;

      // after compared(regarless if the above condition true or not), change to unsorted color
      arr[j].style.backgroundColor = unsortedColor;
    }

    // if there is no value(arr[minIdx]) such that less than arr[i]
    // there is no, arr[minIdx] !< arr[i]
    if(minIdx===i) {
      arr[i].style.backgroundColor = sortedColor;
      continue;
    }

    // now we give a color to the element that need to be swapped
    arr[minIdx].style.backgroundColor = "yellow";
    await delay(howFast);


    swapForArr(arr,i,minIdx)
    arr[i].style.backgroundColor = sortedColor;
    arr[minIdx].style.backgroundColor = unsortedColor;
  }

  arr[arr.length-1].style.backgroundColor = sortedColor;
}




async function merge(
  arr: HTMLCollection,
  leftIdx: number,
  mid: number,
  rightIdx: number,
  howFast: number,
){
  let i=0, j=0, x=0;
  let m = mid-leftIdx+1;
  let n = rightIdx-mid;
  const tempSortedArr = [];
  const left = new Array(m);
  const right = new Array(n);
  for(let i=0; i<m; i++) left[i] = arr[i+leftIdx];
  for(let i=0; i<n; i++) right[i] = arr[i+mid+1];


  console.log(`leftIdx=${leftIdx} mid=${mid} rightIdx=${rightIdx}`);
  console.log(`m=${m} n=${n}`);
  
  while(i<m && j<n) {
    let iVal: number = getHeightNode(left[i]);
    let jVal: number = getHeightNode(right[j]);
    left[i].style.backgroundColor = "yellow";
    right[j].style.backgroundColor = "yellow";
    await delay(howFast);


    console.log(`${iVal} ${jVal}`)
    if(iVal<=jVal){
      left[i].style.backgroundColor = unsortedColor;
      tempSortedArr[x] = left[i].style.height;
      x++;
      i++;
    }else{
      right[j].style.backgroundColor = unsortedColor;
      tempSortedArr[x] = right[j].style.height;
      x++;
      j++;
    }
  }

  while(i<m) {
    left[i].style.backgroundColor = "yellow";
    await delay(howFast);

    tempSortedArr[x] = left[i].style.height;
    left[i].style.backgroundColor = unsortedColor;
    x++;
    i++;
  }
  while(j<n) {
    right[j].style.backgroundColor = "yellow";
    await delay(howFast);

    tempSortedArr[x] = right[j].style.height;
    right[j].style.backgroundColor = unsortedColor;
    x++;
    j++
  }
	console.log("height result: ",tempSortedArr,'\n\n');

  x=0;
  for(let i=leftIdx; i<=rightIdx; i++,x++){
    arr[i].style.height = tempSortedArr[x];
  }
}

// In this case let's treat HTMLCollection and Array share a common properties
async function divideMerge(
  arr: HTMLCollection,
  leftIdx: number,
  rightIdx: number,
  howFast: number,
) {
  if(leftIdx>=rightIdx) return;
  let mid: number = leftIdx+Math.floor((rightIdx-leftIdx)/2);


  await divideMerge(arr,leftIdx,mid,howFast);
  await divideMerge(arr,mid+1,rightIdx,howFast);

  console.log("conquer and combine part");
  await merge(arr,leftIdx,mid,rightIdx,howFast);

}

async function mergeSort() {
  const howFast: number = Number(speedInput.value);
  await divideMerge(arr,0,arr.length-1,howFast);
}





async function lomutoPartition(
  arr: HTMLCollection,
  start: number,
  right: number,
  howFast: number,
): Promise<number> {
  const pivot: number = getHeightNode(arr[right]);
  arr[right].style.backgroundColor = "yellow";
  await delay(howFast);

  let i = start-1;
  for(let j=start; j<=right-1; j++){
    arr[j].style.backgroundColor = "yellow";
    await delay(howFast);

    if(
      getHeightNode(arr[j])<=pivot
    ){
      i++;
      // arr[j].style.backgroundColor = "orange";
      arr[i].style.backgroundColor = "yellow";
      await delay(howFast);
      
      swapForArr(arr,i,j)
      arr[i].style.backgroundColor = unsortedColor;
    }
    arr[j].style.backgroundColor = unsortedColor;
  }
  arr[i+1].style.backgroundColor = "yellow";
  await delay(howFast);
  // arr[right].style.backgroundColor = "orange";
  
  swapForArr(arr,i+1,right);

  arr[i+1].style.backgroundColor = unsortedColor;
  arr[right].style.backgroundColor = unsortedColor;
  return i+1;
}

async function divideLomuto(
  arr: HTMLCollection,
  start: number,
  right: number,
  howFast: number,
) {
  if(start<right){
    const partitionIdx: number = await lomutoPartition(arr,start,right,howFast);
    await divideLomuto(arr,start,partitionIdx-1,howFast);
    await divideLomuto(arr,partitionIdx+1,right,howFast);
  }
}

async function quickSortLomuto(){
  const howFast: number = Number(speedInput.value);
  await divideLomuto(arr,0,arr.length-1,howFast)
}






async function quickSortHoare(){

}





async function heapSort(){
  await printHTMLCollection(arr);
  const howFast: number = Number(speedInput.value);
  await heapify(arr,howFast);
  let n = arr.length;
  console.log("heapified: ")
  await printHTMLCollection(arr);
  while(--n){
    swapForArr(arr,0,n);
    await deleteMaxHeapify(arr,n,0,howFast);
  }
}





async function mergeSortInplace(){

}





async function shellSort(){
  const howFast: number = Number(speedInput.value);
  let n = arr.length;
  for(let gap=Math.floor(n/2); gap>=1; gap=Math.floor(gap/2)){
    for(let right=gap; right<n; right++){
      for(let left=right-gap; left>=0; left-=gap){
        arr[left].style.backgroundColor = "yellow";
        arr[left+gap].style.backgroundColor = "yellow";
        await delay(howFast);
        if(getHeightNode(arr[left])>getHeightNode(arr[left+gap])){
          arr[left].style.backgroundColor = unsortedColor;
          arr[left+gap].style.backgroundColor = unsortedColor;
          swapForArr(arr,left,left+gap);
        }else{
          arr[left].style.backgroundColor = unsortedColor;
          arr[left+gap].style.backgroundColor = unsortedColor;
          break;
        }
      }
    }
  }

}

export {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSortLomuto,
  quickSortHoare,
  heapSort,
  mergeSortInplace,
  shellSort
};