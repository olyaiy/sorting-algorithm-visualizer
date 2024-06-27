import React from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { VolumeX, Volume2 } from 'lucide-react';
import { useSorting } from '../hooks/useSorting';

const SortingVisualizer = () => {
  const {
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
  } = useSorting();

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (muted) {
      setMuted(false);
      if (volume === 0) {
        setVolume(20); // Set to default volume when unmuting from 0
      }
    } else {
      setMuted(true);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sorting Algorithm Visualizer</h2>
      <div className="flex flex-wrap mb-4 gap-2 items-center">
        <Button onClick={resetArray} disabled={sorting && !paused}>
          Reset Array
        </Button>
        <Select onValueChange={setAlgorithm} value={algorithm} disabled={sorting}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bubble">Bubble Sort</SelectItem>
            <SelectItem value="selection">Selection Sort</SelectItem>
            <SelectItem value="insertion">Insertion Sort</SelectItem>
            <SelectItem value="quick">Quick Sort</SelectItem>
            <SelectItem value="merge">Merge Sort</SelectItem>
            <SelectItem value="heap">Heap Sort</SelectItem>
            <SelectItem value="shell">Shell Sort</SelectItem>
            <SelectItem value="cocktail">Cocktail Shaker Sort</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={startSort} disabled={sorting}>
          Start Sorting
        </Button>
        <Button onClick={togglePause} disabled={!sorting}>
          {paused ? 'Resume' : 'Pause'}
        </Button>
        <div className="flex items-center gap-2">
          <Button onClick={handleMuteToggle} className="p-2">
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </Button>
          <input
            type="range"
            min="0"
            max="100"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Speed</label>
        <Slider
          min={1}
          max={100}
          step={1}
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Array Size</label>
        <Slider
          min={10}
          max={100}
          step={1}
          value={[size]}
          onValueChange={(value) => setSize(value[0])}
          disabled={sorting}
        />
      </div>
      <div className="flex items-end h-64 border-b border-gray-300">
        {arrayData.map((item, idx) => (
          <div
            key={idx}
            style={{
              height: `${(item.value / size) * 100}%`,
              width: `${100 / size}%`,
              backgroundColor: item.color,
            }}
            className="mr-px"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;