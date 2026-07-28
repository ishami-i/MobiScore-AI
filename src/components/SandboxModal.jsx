import React, { useState } from 'react';
import { X, Sliders, RefreshCw, Check } from 'lucide-react';

export default function SandboxModal({ isOpen, onClose }) {
  const [velocityWeight, setVelocityWeight] = useState(40);
  const [supplierWeight, setSupplierWeight] = useState(30);
  const [floatWeight, setFloatWeight] = useState(30);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card max-w-lg w-full p-6 space-y-6 relative border-amber-400/40 glow-border-gold">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white font-heading">
            Bank Risk Manager Algorithm Sandbox
          </h3>
        </div>

        <p className="text-xs text-slate-400">
          Calibrate the scoring model weights to match your bank's credit risk policy. Scores will recalculate live across all applicant profiles.
        </p>

        {/* Sliders */}
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-300">Revenue Velocity Weight</span>
              <span className="text-amber-400 font-mono">{velocityWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={velocityWeight}
              onChange={(e) => setVelocityWeight(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-300">Wholesale Supplier Discipline Weight</span>
              <span className="text-amber-400 font-mono">{supplierWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={supplierWeight}
              onChange={(e) => setSupplierWeight(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-300">Retained Float Ratio Weight</span>
              <span className="text-amber-400 font-mono">{floatWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={floatWeight}
              onChange={(e) => setFloatWeight(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
          <button onClick={onClose} className="btn-glass text-xs">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-gold text-xs">
            {isSaved ? (
              <>
                <Check className="w-4 h-4" /> Recalibrated & Saved!
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" /> Apply Recalibration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
