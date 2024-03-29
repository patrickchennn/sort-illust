// @ts-nocheck
import { delay, printHTMLCollection,getHeightNode,swapForArr } from "../utilities";
import { unsortedColor,sortedColor } from "../colors";
import { barContainer1,speedInput,arrContainer } from "../../dom/dom_elements";
import { heapify,deleteMaxHeapify } from "./HeapDSMethods";

const arr = barContainer1.children as HTMLCollection



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
        swapForArr(arr,j,j+1);
        isSwap=true;
      }

      element_j.style.backgroundColor = unsortedColor;
      element_j_plus_1.style.backgroundColor = unsortedColor;
    }
    arr[arr.length-1-i].style.backgroundColor = sortedColor;
    if(isSwap===false) break;
  }
}





// these arguments are intended for timsort
async function insertionSort(left: number = 0, right: number = 0){
  const howFast: number = Number(speedInput.value);

  // for tim sort
  if(right>0||left>0){
    for(let i=1+left; i<right; i++){
      const element_i = arr[i] as HTMLElement;
      let j: number = i-1;
      let currVal: number = getHeightNode(element_i);
      while(
        j>=left && 
        currVal<getHeightNode(arr[j] as HTMLElement)
      ){
        // element to be compared  
        arr[j+1].style.backgroundColor = "yellow";
        arr[j].style.backgroundColor = "yellow";
        await delay(howFast);
  
        swapForArr(arr,j,j+1);
        arr[j+1].style.backgroundColor = unsortedColor;
        arr[j].style.backgroundColor = unsortedColor;
        j--;
      }
      // arr[j+1].style.height = currVal+'px';
    }
  }else{
    // normal insertion sort
    for(let i=1; i<arr.length; i++){
      const element_i = arr[i] as HTMLElement;
      let j: number = i-1;
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
        for(let k=i; k>=0; k--){
          arr[k].style.backgroundColor = sortedColor;
        }
        j--;
      }
      element_i.style.backgroundColor = sortedColor;
    }
  }
}





async function selectionSort() {
  const howFast: number = Number(speedInput.value);

  for(let i=0; i<arr.length-1; i++){
    let minIdx = i;
    // selected element
    arr[i].style.backgroundColor = "yellow";

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
    arr[i].style.backgroundColor = "skyblue";
    arr[minIdx].style.backgroundColor = "skyblue";
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






async function mergeInplace(
  arr: HTMLCollection,
  mid: number,
  howFast: number,
){
	let rightStart = mid + 1;

	// If the arr already in the right place(sorted)
	if(getHeightNode(arr[mid]) <= getHeightNode(arr[rightStart])){
		return;
	}

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

// In this case let's treat HTMLCollection and Array share a common properties
async function divideMergeInplace(
  arr: HTMLCollection,
  leftIdx: number,
  rightIdx: number,
  howFast: number,
) {
  if(leftIdx>=rightIdx) return;
  let mid: number = leftIdx+Math.floor((rightIdx-leftIdx)/2);

  await divideMergeInplace(arr,leftIdx,mid,howFast);
  await divideMergeInplace(arr,mid+1,rightIdx,howFast);

  console.log("conquer and combine part");
  await mergeInplace(arr,mid,howFast);
}

async function mergeSortInplace(){
  const howFast: number = Number(speedInput.value);
  await divideMergeInplace(arr,0,arr.length-1,howFast);
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





async function cocktailSort(){
  const howFast: number = Number(speedInput.value);

  let isSwap: boolean = true;
  let end=arr.length-1;
  let start=0;
  while(isSwap){
    isSwap = false;
    for(let j=start; j<end; j++){
      arr[j].style.backgroundColor = "yellow";
      arr[j+1].style.backgroundColor = "yellow";
      await delay(howFast);

      if(getHeightNode(arr[j])>getHeightNode(arr[j+1])){
        swapForArr(arr,j,j+1);
        isSwap = true;
      }
      arr[j].style.backgroundColor = unsortedColor;
      arr[j+1].style.backgroundColor = unsortedColor;
    }
    arr[end].style.backgroundColor = sortedColor;
    if(!isSwap) break;
    isSwap = false;

    end--;
    for(let j=end-1; j>=start; j--){
      arr[j].style.backgroundColor = "yellow";
      arr[j+1].style.backgroundColor = "yellow";
      await delay(howFast);

      if(getHeightNode(arr[j])>getHeightNode(arr[j+1])){
        swapForArr(arr,j,j+1);
        isSwap = true;
      }
      arr[j].style.backgroundColor = unsortedColor;
      arr[j+1].style.backgroundColor = unsortedColor;
    }
    start++;
  }
}



function getNextGap(gap: number){
  // Shrink gap by Shrink factor
  gap = Math.floor(gap*10/13);
  if (gap < 1) return 1;
  return gap;
}

async function combSort(){
  const howFast: number = Number(speedInput.value);

  let n = arr.length;
  let gap = n;
  let swapped = true;

  while (gap != 1 || swapped == true){
    gap = getNextGap(gap);
    swapped = false;
    for (let i=0; i<n-gap; i++){
      arr[i].style.backgroundColor = "yellow";
      arr[i+gap].style.backgroundColor = "yellow";
      await delay(howFast);
      if(getHeightNode(arr[i]) > getHeightNode(arr[i+gap])){
        swapForArr(arr,i,i+gap);
        swapped = true;
      }
      arr[i].style.backgroundColor = unsortedColor;
      arr[i+gap].style.backgroundColor = unsortedColor;
    }
    console.log("\n");
  }
}







async function cycleSort(){
  const howFast: number = Number(speedInput.value);

  let n: number = arr.length;
  // count number of memory writes
  let writes = 0;

  // traverse array elements and put it to on
  // the right place
  for (let cycle_start=0; cycle_start<n-1; cycle_start++){
    // initialize item as starting point
    let item: number = getHeightNode(arr[cycle_start]);
    // Find position where we put the item. We basically count all smaller elements on right side of item.

    let pos: number = cycle_start;
    
    arr[cycle_start].style.backgroundColor = "yellow";
    for (let i=cycle_start+1; i<n; i++){
      if(getComputedStyle(arr[i]).backgroundColor !== sortedColor){
        arr[i].style.backgroundColor = "yellow";
        await delay(howFast)
        arr[i].style.backgroundColor = unsortedColor;
      }

      if (getHeightNode(arr[i]) < item) pos++;
    }

    // ignore all duplicate elements
    while (item == getHeightNode(arr[pos])){
      arr[pos].style.backgroundColor = "yellow";
      await delay(howFast)
      pos++;
      arr[pos].style.backgroundColor = unsortedColor;
    }

    // If item is already in correct position
    if (pos == cycle_start){
      arr[cycle_start].style.backgroundColor = sortedColor;
      continue;
    }

    // put the item to it's right position
    if (pos != cycle_start){
      arr[pos].style.backgroundColor = "yellow";
      await delay(howFast);

      let temp: number = item;
      item = getHeightNode(arr[pos]);
      arr[pos].style.height = temp+"px";
      arr[cycle_start].style.height = item+"px";
      arr[pos].style.backgroundColor = sortedColor;
      // arr[pos].style.backgroundColor = unsortedColor;


      writes++;
    }

    // Rotate rest of the cycle
    while (pos != cycle_start){
      pos = cycle_start;
      
      // Find position where we put the element
      for (let i=cycle_start+1; i<n; i++){
        if(getComputedStyle(arr[i]).backgroundColor !== sortedColor){
          arr[i].style.backgroundColor = "yellow";
          await delay(howFast)
          arr[i].style.backgroundColor = unsortedColor;
        }
        if (getHeightNode(arr[i]) < item) pos++;
      }
      // If item is already in correct position
      if (pos == cycle_start) {
        arr[cycle_start].style.backgroundColor = sortedColor;
        continue;
      }
      
      // ignore all duplicate elements
      while (item == getHeightNode(arr[pos])) {
        arr[pos].style.backgroundColor = "yellow";
        await delay(howFast)
        pos++;
        arr[pos].style.backgroundColor = unsortedColor;
      }

      // put the item to it's right position
      if (item != getHeightNode(arr[pos])) {
        arr[pos].style.backgroundColor = "yellow";
        await delay(howFast);
        
        let temp = item;
        item = getHeightNode(arr[pos]);
        arr[pos].style.height = temp+"px";
        arr[cycle_start].style.height = item+"px"
        arr[pos].style.backgroundColor = sortedColor;
        // arr[pos].style.backgroundColor = sortedColor;


        writes++;
      }
    }
  }
}





async function timSort(){
  const howFast: number = Number(speedInput.value);
  
  const n=arr.length
  const RUN = 32;
    // Sort individual subarrays of size RUN
    for (let i=0; i<n; i+=RUN)
      await insertionSort(i, Math.min(i+RUN,n))

    for (let partition=RUN; partition<n; partition*=2){
      for (let left=0; left<n; left+=2*partition){
        let mid: number = left + partition - 1;
        let right: number = Math.min(left+2*partition-1,n-1);

        if(mid<right) await merge(arr, left, mid, right,howFast);
      }
    }
}


async function strand(output:HTMLDivElement,howFast: number,firstTime: boolean){
  if(arr.length<1) return;
  let sublist: Array<HTMLElement> = []
  sublist.push(arr[0] as HTMLElement);

  arr[0].style.backgroundColor = "yellow";
  
  console.log(arr);

  for(let i=0,j=0; i<arr.length; i++){
    if(i===0) continue;

    arr[i].style.backgroundColor = "yellow";
    await delay(howFast);
    if(getHeightNode(arr[i])>getHeightNode(sublist[j]!)){
      arr[i].style.backgroundColor = "skyblue";
      await delay(howFast);
      sublist.push(arr[i] as HTMLElement);
      j++
    }else{
      arr[i].style.backgroundColor = unsortedColor;
    }
  }
  arr[0].style.backgroundColor = "skyblue";
  await delay(howFast);
  
  if(firstTime){
    console.log("ANJGGGGGGGGGGGGGGGGGGGR")
    for(let ele of sublist){
      ele.style.backgroundColor = "#323232"
      console.log(getHeightNode(ele));
      await delay(howFast);
      output.append(ele)
    }
    firstTime=false;
  }
  else{
    let subListEnd = sublist.length-1;
    let outputStart = 0;
    console.log(sublist);
    while(sublist.length>0){

      sublist[subListEnd].style.backgroundColor = "chocolate";
      output.children[outputStart].style.backgroundColor = "chocolate";
      await delay(howFast);

      if(getHeightNode(sublist[subListEnd]) > getHeightNode(output.children[outputStart])){
        output.children[outputStart++].style.backgroundColor = "#323232";
        await delay(howFast);
      }else{
        sublist[subListEnd].style.backgroundColor = "#323232";
        output.children[outputStart].style.backgroundColor = "#323232";
        await delay(howFast);
        output.insertBefore(sublist[subListEnd], output.children[outputStart]);
        sublist.splice(subListEnd,1);

        subListEnd--;
        outputStart=0;
      }
    }
  }
  await strand(output,howFast,firstTime)
}

async function strandSort(output: HTMLDivElement){
  const howFast: number = Number(speedInput.value);
  let firstTime = true;
  await strand(output,howFast,firstTime);
}






async function patienceSort(){
  const howFast: number = Number(speedInput.value);
  const n: number = arr.length
  // this is a 2d array
	let piles: Array<Array<HTMLElement>> = [];

	for (let i=0; i<n; i++) {
    const ele = arr[i] as HTMLElement;
		if (piles.length===0) {
      piles.push([ele]);
		}else {
			let flag: boolean = true;
			for (let pile of piles) {
        const topeleOfPile: number = getHeightNode(pile[pile.length-1]);
				if (getHeightNode(ele) < topeleOfPile) {
					pile.push(ele);
					flag = false;
					break;
				}
			}
			if (flag) {
        piles.push([ele]);
			}
		}
	}
  const newArr = document.createElement("div");
  newArr.classList.add("arr-style")
  arrContainer.append(newArr);
  for(let pile of piles){
    const div = document.createElement("div");
    div.classList.add("pile")
    newArr.append(div);

    for(let val of pile){
      val.style.background = "#ca50f6";
      await delay(howFast);
    }
    for(let val of pile){
      div.append(val);
      await delay(howFast);
    }

  }
  console.log(piles)

  let min = Number.MAX_SAFE_INTEGER;
  let posToBeDeleted!: number;
  for(let i=0; i<n; i++){
    for(let j=0; j<piles.length; j++){
      const pile: Array<HTMLElement> = piles[j]
      if(!pile.length) continue
      const lastIdx: number = pile.length-1;
      const lastVal: number = getHeightNode(pile[lastIdx])

      pile[lastIdx].style.backgroundColor = "yellow";
      await delay(howFast)

      if(lastVal<min){
        min = lastVal;
        posToBeDeleted = j;
      }
    }
    
    for(let j=0; j<piles.length; j++){
      const pile: Array<HTMLElement> = piles[j]
      if(!pile.length) continue
      const lastIdx: number = pile.length-1;
      pile[lastIdx].style.backgroundColor = unsortedColor;
    }
    const lastIdx: number = piles[posToBeDeleted].length-1
    
    piles[posToBeDeleted][lastIdx].style.backgroundColor = sortedColor;
    await delay(howFast)
    
    barContainer1.append(piles[posToBeDeleted][lastIdx]);
    await delay(howFast)
    
    

    piles[posToBeDeleted].pop()
    min = Number.MAX_SAFE_INTEGER
  }
}





async function oddEvenSort(){
  const howFast: number = Number(speedInput.value);

  let isSorted = false;
  const n = arr.length;
  while (!isSorted){
    isSorted = true;

    // Perform Bubble sort on odd indexed element
    for (let i=1; i<=n-2; i+=2){
      arr[i].style.backgroundColor = "yellow"
      arr[i+1].style.backgroundColor = "yellow"
      await delay(howFast);
      if (getHeightNode(arr[i]) > getHeightNode(arr[i+1])){
        swapForArr(arr,i,i+1)
        isSorted = false;
      }
      arr[i].style.backgroundColor = unsortedColor
      arr[i+1].style.backgroundColor = unsortedColor
    }

    // Perform Bubble sort on even indexed element
    for (let i=0; i<=n-2; i=i+2){
      arr[i].style.backgroundColor = "yellow"
      arr[i+1].style.backgroundColor = "yellow"
      await delay(howFast);
      if (getHeightNode(arr[i]) > getHeightNode(arr[i+1])){
        swapForArr(arr,i,i+1)
        isSorted = false;
      }
      arr[i].style.backgroundColor = unsortedColor
      arr[i+1].style.backgroundColor = unsortedColor
    }
  }
}




async function gnomeSort(){
  const howFast: number = Number(speedInput.value);
  let index: number = 0;
  const n: number = arr.length;

  while (index < n) {
    if (index == 0) index++;
    arr[index-1].style.backgroundColor = "yellow";
    arr[index].style.backgroundColor = "yellow"
    await delay(howFast);

    if (getHeightNode(arr[index-1]) > getHeightNode(arr[index])){
      swapForArr(arr,index,index-1)
      arr[index-1].style.backgroundColor = unsortedColor;
      arr[index].style.backgroundColor = unsortedColor
      index--;
    }else {
      arr[index-1].style.backgroundColor = unsortedColor;
      arr[index].style.backgroundColor = unsortedColor
      index++;
    }
  }
}





async function exchangeSort(){
  const howFast: number = Number(speedInput.value);

  for(let i=0; i<arr.length; i++){
    for(let j=i+1; j<arr.length; j++){
      arr[i].style.backgroundColor = "yellow";
      arr[j].style.backgroundColor = "yellow";
      await delay(howFast)
      if(getHeightNode(arr[i])>getHeightNode(arr[j])){
        swapForArr(arr,i,j);
      }
      arr[j].style.backgroundColor = unsortedColor;
      arr[i].style.backgroundColor = unsortedColor;
    }
    arr[i].style.backgroundColor = sortedColor;
  }
}




async function isSorted(a:HTMLCollection,howFast: number){
  for(var i = 1; i < arr.length; i++){
    a[i].style.backgroundColor = "yellow";
    a[i-1].style.backgroundColor = "yellow";
    await delay(howFast)
    if (getHeightNode(a[i]) < getHeightNode(a[i-1])){
      a[i].style.backgroundColor = unsortedColor;
      a[i-1].style.backgroundColor = unsortedColor;
      return false;
    }
    a[i].style.backgroundColor = sortedColor;
    a[i-1].style.backgroundColor = sortedColor;
  }
  return true;
}

// To generate permutation of the array
async function shuffle(a:HTMLCollection, n: number,howFast: number){
  const j=n;
  for (let i=0; i<n; i++){
    // 0 <= idx < n
    const idx = Math.floor(Math.random() * n);
    arr[j-i-1].style.backgroundColor = "skyblue";
    arr[idx].style.backgroundColor = "skyblue";
    await delay(howFast)
    swapForArr(a, j-i-1, idx);
    arr[j-i-1].style.backgroundColor = unsortedColor;
    arr[idx].style.backgroundColor = unsortedColor;
  }
}

async function bogoSort(){
  const n: number = arr.length;
  const howFast: number = Number(speedInput.value);

  while (! await isSorted(arr,howFast))
    await shuffle(arr, n,howFast);
}



async function flip(arr: HTMLCollection, right: number,flipNth: number, howFast: number){
  let left = 0;
  let right2 = right;
  while (left < right){
    arr[left].style.backgroundColor = "yellow";
    arr[right].style.backgroundColor = "yellow";
    await delay(howFast);

    swapForArr(arr,left,right);
    arr[left].style.backgroundColor = unsortedColor;
    arr[right].style.backgroundColor = unsortedColor;
    left++;
    right--;
  }

  if(flipNth===2){
    arr[right2].style.backgroundColor = sortedColor;
    await delay(howFast);
  }
}

async function findMaxIdx(arr: HTMLCollection, n: number){
  let index: number = 0;
  for (let i=0; i<n; ++i){
    if (getHeightNode(arr[i]) > getHeightNode(arr[index])){
      index = i;
    }
  }
  return index;
}


async function pancakeSort(){
  const n: number = arr.length;
  const howFast: number = Number(speedInput.value);

  for(let size=n-1; size>=0; size--){
    let maxVal: number = await findMaxIdx(arr,size);
    await flip(arr, maxVal, 1, howFast);
    await flip(arr, size, 2, howFast);
  }
}




async function stoogeSortUtil(l: number, h: number, howFast: number) {
  if (l >= h){
    return;
  }

  arr[l].style.backgroundColor = "yellow";
  arr[h].style.backgroundColor = "yellow";
  await delay(howFast)
  if (getHeightNode(arr[l]) > getHeightNode(arr[h])) {
    swapForArr(arr,l,h)
  }
  arr[l].style.backgroundColor = unsortedColor;
  arr[h].style.backgroundColor = unsortedColor;

  if (h+1-l> 2) {
    let t = Math.floor((h+1 - l) / 3);

    // Recursively sort first
    // 2/3 elements
    await stoogeSortUtil(l, h-t, howFast);

    // Recursively sort last
    // 2/3 elements
    await stoogeSortUtil(l+t, h, howFast);

    // Recursively sort first
    // 2/3 elements again to
    // confirm
    await stoogeSortUtil(l, h-t, howFast);
  }
}
async function stoogeSort(){
  const howFast: number = Number(speedInput.value);
  await stoogeSortUtil(0, arr.length-1, howFast)
}





async function slowSortUtil(i:number, j: number,howFast: number) {
  if (i >= j)
    return;
  let m = Math.floor((i + j)/2);

  await slowSortUtil( i, m,howFast);
  await slowSortUtil(m + 1, j,howFast);

  arr[j].style.backgroundColor = "yellow";
  arr[m].style.backgroundColor = "yellow";
  await delay(howFast)

  if (getHeightNode(arr[j]) < getHeightNode(arr[m])) {
    swapForArr(arr,j,m)
  }

  arr[j].style.backgroundColor = unsortedColor;
  arr[m].style.backgroundColor = unsortedColor;

  await slowSortUtil(i, j - 1,howFast);
}

async function slowSort(){
  const howFast: number = Number(speedInput.value);
  await slowSortUtil(0, arr.length-1, howFast);
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
  shellSort,
  cocktailSort,
  combSort,
  cycleSort,
  timSort,
  strandSort,
  patienceSort,
  oddEvenSort,
  gnomeSort,
  exchangeSort,
  bogoSort,
  pancakeSort,
  stoogeSort,
  slowSort
};