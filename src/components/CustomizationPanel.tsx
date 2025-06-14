// src/components/CustomizationPanel.tsx
import { useSnapshot } from "valtio";
import { DoorStore } from "../stores/doorStore";
import { Card } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import type { ColorTarget, DoorModel, HandleColor } from "../stores/doorStore";

const DOOR_MODELS: { id: DoorModel; name: string }[] = [
  { id: "Elite", name: "Elite" },
  { id: "CNC", name: "CNC" },
  { id: "LinePivot", name: "LinePivot" },
  { id: "AluTrim", name: "AluTrim" },
  { id: "Collage", name: "Collage" },
  { id: "FrameGlass", name: "Frame Glass" },
  { id: "Hospital", name: "Hospital" },
  { id: "Frameless", name: "Frameless" },
  { id: "Hotel", name: "Hotel" },
  { id: "Vacum", name: "Vacum" },
  { id: "Outdoor", name: "Outdoor" },
];

const COLORS = [
  "#808080", // Gray
  "#A0522D", // Brown
  "#FFFFFF", // White
  "#006B54", // Green
  "#CD7F32", // Bronze
  "#B87333", // Copper
  "#C0C0C0", // Silver
  "#DAA520", // Golden
  "#808080", // Gray
  "#FFFFFF", // White
  "#000000", // Black
  "#FFFFFF", // White
  "#C0C0C0", // Silver
];

const BACKGROUNDS = [
  { name: "Light", image: "/backgrounds/light.svg" },
  { name: "Green", image: "/backgrounds/green.svg" },
  { name: "Navy", image: "/backgrounds/navy.svg" },
  { name: "White", image: "/backgrounds/white.svg" },
  { name: "Dark", image: "/backgrounds/dark.svg" },
];

const HANDLE_COLORS: { color: HandleColor; hex: string }[] = [
  { color: "Black", hex: "#000000" },
  { color: "Gold", hex: "#FFD700" },
  { color: "Copper", hex: "#B87333" },
  { color: "Silver", hex: "#C0C0C0" },
];

export function CustomizationPanel() {
  const state = useSnapshot(DoorStore);

  return (
    <div className="w-[400px] bg-white p-8 overflow-y-auto space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Doors Models</h1>
        <img src="/cdoor-logo.svg" alt="CDOOR" className="h-8" />
      </div>

      {/* Door Models */}
      <div>
        <p className="text-sm text-gray-500 mb-4">Choose your model</p>
        <div className="grid grid-cols-5 gap-4">
          {DOOR_MODELS.map((model) => (
            <button
              key={model.id}
              className={`p-3 rounded-lg border ${
                state.doorModel === model.id
                  ? "border-blue-600"
                  : "border-gray-200"
              } hover:border-blue-400 transition-colors`}
              onClick={() => {
                DoorStore.doorModel = model.id;
              }}
            >
              <img src={`/doors/${model.id.toLowerCase()}.svg`} alt={model.name} className="w-full" />
              <p className="text-xs mt-1 text-center">{model.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Color</p>
          <div className="flex gap-4 mb-6">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                state.colorTarget === "Both"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => {
                DoorStore.colorTarget = "Both";
              }}
            >
              Both
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                state.colorTarget === "Door"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => {
                DoorStore.colorTarget = "Door";
              }}
            >
              Door
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                state.colorTarget === "Frame"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => {
                DoorStore.colorTarget = "Frame";
              }}
            >
              Frame
            </button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {COLORS.map((color, index) => (
              <button
                key={index}
              className={`w-10 h-10 rounded-full border-2 ${
                  (state.colorTarget === "Both" &&
                    state.doorColor === color &&
                    state.frameColor === color) ||
                  (state.colorTarget === "Door" && state.doorColor === color) ||
                  (state.colorTarget === "Frame" && state.frameColor === color)
                    ? "border-blue-600"
                    : "border-gray-200"
                } hover:border-blue-400 transition-colors`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  if (state.colorTarget === "Both") {
                    DoorStore.doorColor = color;
                    DoorStore.frameColor = color;
                  } else if (state.colorTarget === "Door") {
                    DoorStore.doorColor = color;
                  } else {
                    DoorStore.frameColor = color;
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Patterns */}
      <div>
        <p className="text-sm text-gray-500 mb-4">Patterns</p>
        <div className="grid grid-cols-4 gap-4">
          {/* Add pattern images here */}
        </div>
      </div>

      {/* Background */}
      <div>
        <p className="text-sm text-gray-500 mb-4">Background</p>
        <div className="grid grid-cols-5 gap-4">
          {BACKGROUNDS.map((bg, index) => (
            <button
              key={index}
              className={`relative aspect-square rounded-lg border-2 overflow-hidden ${
                state.background === bg.image
                  ? "border-blue-600"
                  : "border-gray-200"
              } hover:border-blue-400 transition-colors`}
              onClick={() => {
                DoorStore.background = bg.image;
              }}
            >
              <img
                src={bg.image}
                alt={bg.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Architrave */}
      <div>
        <p className="text-sm text-gray-500 mb-4">Architrave</p>
        <div className="grid grid-cols-4 gap-6">
          {(["CL", "FH", "SA", "IK"] as const).map((arch) => (
            <button
              key={arch}
              className={`p-3 rounded-lg border ${
                state.architrave === arch
                  ? "border-blue-600"
                  : "border-gray-200"
              } hover:border-blue-400 transition-colors`}
              onClick={() => {
                DoorStore.architrave = arch;
              }}
            >
              <img
                src={`/architrave/${arch.toLowerCase()}.svg`}
                alt={arch}
                className="w-full"
              />
              <p className="text-xs mt-1 text-center">{arch}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Handles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">Handles</p>
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              state.handle ? "bg-blue-600 text-white" : "bg-gray-100"
            } hover:bg-opacity-90 transition-colors`}
            onClick={() => {
              DoorStore.handle = !state.handle;
            }}
          >
            {state.handle ? "On" : "Off"}
          </button>
        </div>
        {state.handle && (
          <div className="flex gap-4">
            {HANDLE_COLORS.map((hc) => (
              <button
                key={hc.color}
              className={`w-10 h-10 rounded-full border-2 ${
                state.handleColor === hc.color
                  ? "border-blue-600"
                  : "border-gray-200"
              } hover:border-blue-400 transition-colors`}
                style={{ backgroundColor: hc.hex }}
                onClick={() => {
                  DoorStore.handleColor = hc.color;
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
