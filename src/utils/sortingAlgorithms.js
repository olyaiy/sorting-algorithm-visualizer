// src/utils/sortingAlgorithms.js

const finalCheck = async (arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
    for (let i = 0; i < arr.length; i++) {
      if (await checkPauseAndExit()) return;
      arr[i].color = 'yellow';
      updateArrayData(arr);
      playTone(200 + arr[i].value * 10, 100);
      await sleep(110 - speedRef.current);
      arr[i].color = 'green';
      updateArrayData(arr);
    }
  };
  
  export const bubbleSort = async (arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
    for (let i = 0; i < arr.length; i++) {
      let swapped = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (await checkPauseAndExit()) return;
        
        arr[j].color = 'red';
        arr[j + 1].color = 'red';
        updateArrayData(arr);
        playTone(200 + arr[j].value * 10, 100);
        await sleep(110 - speedRef.current);
  
        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          playTone(200 + arr[j + 1].value * 10, 100);
        }
  
        arr[j].color = 'blue';
        arr[j + 1].color = 'blue';
        updateArrayData(arr);
      }
      
      if (!swapped) break;
      
      arr[arr.length - i - 1].color = 'green';
      updateArrayData(arr);
    }
    
    arr.forEach(item => item.color = 'green');
    updateArrayData(arr);
    await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
  };
  
  export const selectionSort = async (arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
    for (let i = 0; i < arr.length; i++) {
      if (await checkPauseAndExit()) return;
      let minIdx = i;
      arr[i].color = 'red';
      updateArrayData(arr);
      playTone(200 + arr[i].value * 10, 100);
      await sleep(110 - speedRef.current);
  
      for (let j = i + 1; j < arr.length; j++) {
        if (await checkPauseAndExit()) return;
        arr[j].color = 'red';
        updateArrayData(arr);
        playTone(200 + arr[j].value * 10, 100);
        await sleep(110 - speedRef.current);
  
        if (arr[j].value < arr[minIdx].value) {
          arr[minIdx].color = 'blue';
          minIdx = j;
        } else {
          arr[j].color = 'blue';
        }
        updateArrayData(arr);
      }
  
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        playTone(200 + arr[i].value * 10, 100);
      }
      arr[i].color = 'green';
      updateArrayData(arr);
    }
    await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
  };
  
  export const insertionSort = async (arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
    for (let i = 1; i < arr.length; i++) {
      if (await checkPauseAndExit()) return;
      let key = arr[i];
      let j = i - 1;
      arr[i].color = 'red';
      updateArrayData(arr);
      playTone(200 + arr[i].value * 10, 100);
      await sleep(110 - speedRef.current);
  
      while (j >= 0 && arr[j].value > key.value) {
        if (await checkPauseAndExit()) return;
        arr[j + 1] = arr[j];
        j = j - 1;
        arr[j + 1].color = 'red';
        updateArrayData(arr);
        playTone(200 + arr[j + 1].value * 10, 100);
        await sleep(110 - speedRef.current);
        arr[j + 1].color = 'blue';
      }
      arr[j + 1] = key;
      arr[j + 1].color = 'green';
      updateArrayData(arr);
    }
    arr.forEach(item => item.color = 'green');
    updateArrayData(arr);
    await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
  };
  
  export const quickSort = async (arr, low, high, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j <= high - 1; j++) {
        if (await checkPauseAndExit()) return;
        arr[j].color = 'red';
        updateArrayData(arr);
        playTone(200 + arr[j].value * 10, 100);
        await sleep(110 - speedRef.current);
        
        if (arr[j].value < pivot.value) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          playTone(200 + arr[i].value * 10, 100);
        }
        
        arr[j].color = 'blue';
        updateArrayData(arr);
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      playTone(200 + arr[i + 1].value * 10, 100);
      arr[i + 1].color = 'green';
      updateArrayData(arr);
      return i + 1;
    };
  
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
      await quickSort(arr, pi + 1, high, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
    }
    if (low === 0 && high === arr.length - 1) {
      arr.forEach(item => item.color = 'green');
      updateArrayData(arr);
      await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
    }
  };
  
  export const mergeSort = async (arr, left, right, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
    const merge = async (arr, left, mid, right) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = arr.slice(left, mid + 1);
      const R = arr.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < n1 && j < n2) {
        if (await checkPauseAndExit()) return;
        arr[k].color = 'red';
        updateArrayData(arr);
        playTone(200 + arr[k].value * 10, 100);
        await sleep(110 - speedRef.current);
        
        if (L[i].value <= R[j].value) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        k++;
        arr[k-1].color = 'blue';
        updateArrayData(arr);
      }
      
      while (i < n1) {
        if (await checkPauseAndExit()) return;
        arr[k] = L[i];
        arr[k].color = 'red';
        updateArrayData(arr);
        playTone(200 + arr[k].value * 10, 100);
        await sleep(110 - speedRef.current);
        arr[k].color = 'blue';
        i++;
        k++;
      }
      
      while (j < n2) {
        if (await checkPauseAndExit()) return;
        arr[k] = R[j];
        arr[k].color = 'red';
        updateArrayData(arr);
        playTone(200 + arr[k].value * 10, 100);
        await sleep(110 - speedRef.current);
        arr[k].color = 'blue';
        j++;
        k++;
      }
      
      updateArrayData(arr);
    };
  
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
      await mergeSort(arr, mid + 1, right, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
      await merge(arr, left, mid, right);
    }
    if (left === 0 && right === arr.length - 1) {
        arr.forEach(item => item.color = 'green');
        updateArrayData(arr);
        await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
      }
    };
    
    // Helper function to highlight a range of elements
    const highlightRange = async (arr, start, end, color, updateArrayData, playTone, sleep, speedRef) => {
      for (let i = start; i <= end; i++) {
        arr[i].color = color;
        updateArrayData(arr);
        playTone(200 + arr[i].value * 10, 50);
        await sleep((110 - speedRef.current) / 2);
      }
    };
    
    // Heap Sort
    export const heapSort = async (arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
      const heapify = async (n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
    
        if (left < n && arr[left].value > arr[largest].value) largest = left;
        if (right < n && arr[right].value > arr[largest].value) largest = right;
    
        if (largest !== i) {
          await highlightRange(arr, i, largest, 'red', updateArrayData, playTone, sleep, speedRef);
          [arr[i], arr[largest]] = [arr[largest], arr[i]];
          await highlightRange(arr, i, largest, 'blue', updateArrayData, playTone, sleep, speedRef);
          await heapify(n, largest);
        }
      };
    
      // Build max heap
      for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        if (await checkPauseAndExit()) return;
        await heapify(arr.length, i);
      }
    
      // Extract elements from heap one by one
      for (let i = arr.length - 1; i > 0; i--) {
        if (await checkPauseAndExit()) return;
        await highlightRange(arr, 0, i, 'red', updateArrayData, playTone, sleep, speedRef);
        [arr[0], arr[i]] = [arr[i], arr[0]];
        await highlightRange(arr, 0, i, 'blue', updateArrayData, playTone, sleep, speedRef);
        arr[i].color = 'green';
        updateArrayData(arr);
        await heapify(i, 0);
      }
    
      arr[0].color = 'green';
      updateArrayData(arr);
      await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
    };
    
    // Shell Sort
    export const shellSort = async (arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
      const n = arr.length;
      for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
          if (await checkPauseAndExit()) return;
          let temp = arr[i];
          let j;
          
          arr[i].color = 'red';
          updateArrayData(arr);
          playTone(200 + arr[i].value * 10, 100);
          await sleep(110 - speedRef.current);
          
          for (j = i; j >= gap && arr[j - gap].value > temp.value; j -= gap) {
            if (await checkPauseAndExit()) return;
            arr[j] = arr[j - gap];
            arr[j].color = 'red';
            updateArrayData(arr);
            playTone(200 + arr[j].value * 10, 100);
            await sleep(110 - speedRef.current);
            arr[j].color = 'blue';
          }
          
          arr[j] = temp;
          arr[j].color = 'blue';
          updateArrayData(arr);
        }
      }
      
      arr.forEach(item => item.color = 'green');
      updateArrayData(arr);
      await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
    };
    
    // Cocktail Shaker Sort
    export const cocktailShakerSort = async (arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef) => {
      let swapped = true;
      let start = 0;
      let end = arr.length - 1;
    
      while (swapped) {
        swapped = false;
    
        for (let i = start; i < end; i++) {
          if (await checkPauseAndExit()) return;
          arr[i].color = 'red';
          arr[i + 1].color = 'red';
          updateArrayData(arr);
          playTone(200 + arr[i].value * 10, 100);
          await sleep(110 - speedRef.current);
    
          if (arr[i].value > arr[i + 1].value) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;
            playTone(200 + arr[i + 1].value * 10, 100);
          }
    
          arr[i].color = 'blue';
          arr[i + 1].color = 'blue';
          updateArrayData(arr);
        }
    
        if (!swapped) break;
    
        swapped = false;
        end--;
    
        for (let i = end - 1; i >= start; i--) {
          if (await checkPauseAndExit()) return;
          arr[i].color = 'red';
          arr[i + 1].color = 'red';
          updateArrayData(arr);
          playTone(200 + arr[i].value * 10, 100);
          await sleep(110 - speedRef.current);
    
          if (arr[i].value > arr[i + 1].value) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;
            playTone(200 + arr[i + 1].value * 10, 100);
          }
    
          arr[i].color = 'blue';
          arr[i + 1].color = 'blue';
          updateArrayData(arr);
        }
    
        start++;
      }
    
      arr.forEach(item => item.color = 'green');
      updateArrayData(arr);
      await finalCheck(arr, updateArrayData, playTone, sleep, checkPauseAndExit, speedRef);
    };