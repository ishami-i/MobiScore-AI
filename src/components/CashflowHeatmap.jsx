import React from 'react';

export default function CashflowHeatmap({ dailyData = [] }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Sample 28 days velocity (daily revenue in '000 RWF)
  const heatmapGrid = dailyData.length === 28 ? dailyData : [
    120, 140, 180, 210, 190, 250, 310,
    130, 150, 190, 220, 200, 280, 330,
    110, 160, 175, 205, 195, 260, 320,
    140, 165, 185, 230, 210, 290, 340
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF' }}>
            30-Day MoMo Daily Inflow Velocity Heatmap
          </h3>
          <p style={{ fontSize: '11px', color: '#94A3B8' }}>Numbers show daily revenue inflows in thousands of RWF (e.g. 310k = 310,000 RWF).</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: '#94A3B8' }}>
          <span>Low Inflow</span>
          <div style={{ width: '60px', height: '8px', borderRadius: '4px', background: 'linear-gradient(to right, rgba(250, 204, 21, 0.2), rgba(250, 204, 21, 1))' }}></div>
          <span>Peak Sales</span>
        </div>
      </div>

      {/* 7 Columns for Days of Week */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '8px' }}>
        {days.map((day) => (
          <div key={day} style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
            {day}
          </div>
        ))}
      </div>

      {/* 28 Heatmap Grid Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {heatmapGrid.map((val, idx) => {
          const intensity = Math.min(1, val / 350);
          return (
            <div
              key={idx}
              style={{
                height: '44px',
                borderRadius: '8px',
                background: `rgba(250, 204, 21, ${Math.max(0.18, intensity)})`,
                border: '1px solid rgba(250, 204, 21, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                color: intensity > 0.5 ? '#0F172A' : '#F8FAFC'
              }}
              title={`Day ${idx + 1}: ${val},000 RWF Inflow`}
            >
              {val}k RWF
            </div>
          );
        })}
      </div>
    </div>
  );
}
