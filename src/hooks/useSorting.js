// src/hooks/useSorting.js

import { useState, useEffect, useRef } from 'react';
import { createRandomArray } from '../utils/arrayUtils';
import { initAudio, playTone } from '../utils/audioUtils';
import * as sortingAlgorithms from '../utils/sortingAlgorithms';

export const useSorting = (initialSize = 50) => {
  const [arrayData, setArrayData] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(initialSize);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [volume, setVolume] = useState(20);
  const [muted, setMuted] = useState(false);

  const speedRef = useRef(speed);
  const pausedRef = useRef(paused);
  const sortingRef = useRef(sorting);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    resetArray();
  }, [size]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    sortingRef.current = sorting;
  }, [sorting]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(muted ? 0 : volume / 100, audioContextRef.current.currentTime);
    }
  }, [volume, muted]);

  const resetArray = () => {
    const newArray = createRandomArray(size);
    setArrayData(newArray);
    setSorting(false);
    setPaused(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const checkPauseAndExit = async () => {
    if (!sortingRef.current) return true;
    if (pausedRef.current) {
      while (pausedRef.current && sortingRef.current) {
        await sleep(100);
      }
      if (!sortingRef.current) return true;
    }
    return false;
  };

  const updateArrayData = (newData) => {
    setArrayData([...newData]);
  };

  const startSort = async () => {
    initAudio(audioContextRef, gainNodeRef);
    setSorting(true);
    sortingRef.current = true;
    setPaused(false);
    const arr = [...arrayData];
    
    try {
      switch(algorithm) {
        case 'bubble':
          await sortingAlgorithms.bubbleSort(arr, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        case 'selection':
          await sortingAlgorithms.selectionSort(arr, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        case 'insertion':
          await sortingAlgorithms.insertionSort(arr, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        case 'quick':
          await sortingAlgorithms.quickSort(arr, 0, arr.length - 1, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        case 'merge':
          await sortingAlgorithms.mergeSort(arr, 0, arr.length - 1, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        case 'heap':
          await sortingAlgorithms.heapSort(arr, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        case 'shell':
          await sortingAlgorithms.shellSort(arr, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        case 'cocktail':
          await sortingAlgorithms.cocktailShakerSort(arr, updateArrayData, 
            (freq, dur) => playTone(freq, dur, audioContextRef, gainNodeRef), 
            sleep, checkPauseAndExit, speedRef);
          break;
        default:
          console.error('Unknown sorting algorithm:', algorithm);
      }
    } catch (error) {
      console.error('Error during sorting:', error);
    } finally {
      setSorting(false);
      sortingRef.current = false;
    }
  };

  const togglePause = () => {
    setPaused(prev => !prev);
  };

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  return {
    arrayData,
    sorting,
    paused,
    speed,
    size,
    algorithm,
    volume,
    muted,
    setSpeed,
    setSize,
    setAlgorithm,
    setVolume,
    setMuted,
    resetArray,
    startSort,
    togglePause,
    toggleMute
  };
};