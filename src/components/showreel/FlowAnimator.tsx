import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { FlowNode, FlowEdge } from './FlowDefinitions';
import { COLOR_TOKENS } from '../../style/tokens';
import { Typography } from '../Typography';
import { DataOverlay } from './DataOverlay';

interface FlowAnimatorProps {
    nodes: FlowNode[];
    edges: FlowEdge[];
    activePhase?: number; // 0 for all, 1, 2, or 3
    title: string;
}

const NodeIcon: React.FC<{ type: string; active: boolean; delay: number }> = ({ type, active, delay }) => {
    const frame = useCurrentFrame();
    const color = active ? COLOR_TOKENS.primary : 'rgba(255,255,255,0.4)';
    const drawProgress = interpolate(frame, [delay + 10, delay + 30], [0, 1], { extrapolateRight: 'clamp' });

    const props = {
        width: "48",
        height: "48",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "1.5",
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        strokeDasharray: "100",
        strokeDashoffset: (1 - drawProgress) * 100
    };

    switch (type) {
        case 'heat':
            return (
                <svg {...props}>
                    <defs>
                        <linearGradient id="metal-flow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fff" />
                            <stop offset="100%" stopColor={COLOR_TOKENS.primary} />
                        </linearGradient>
                    </defs>
                    <path pathLength={100} d="M7 11V7a5 5 0 0110 0v4M5 11h14v7a3 3 0 01-3 3H8a3 3 0 01-3-3v-7z" fill={active ? 'url(#metal-flow)' : 'none'} fillOpacity={0.1} />
                    <path pathLength={100} d="M9 14h6M9 17h6" strokeOpacity={0.5} />
                    <circle cx="12" cy="14" r="1.5" fill={COLOR_TOKENS.primary} />
                </svg>
            );
        case 'rolling':
            return (
                <svg {...props}>
                    <circle pathLength={100} cx="8" cy="12" r="3.5" strokeWidth="2" />
                    <circle pathLength={100} cx="16" cy="12" r="3.5" strokeWidth="2" />
                    <rect pathLength={100} x="3" y="10" width="18" height="4" rx="1" fill={active ? COLOR_TOKENS.primary : 'none'} fillOpacity={0.2} />
                </svg>
            );
        case 'forging':
            return (
                <svg {...props}>
                    <path pathLength={100} d="M4 21h16M12 3v10M8 13h8M7 21v-4h10v4" strokeWidth="2" />
                    <rect pathLength={100} x="9" y="13" width="6" height="4" fill={active ? COLOR_TOKENS.primary : 'none'} fillOpacity={0.3} />
                </svg>
            );
        case 'machining':
             return (
                <svg {...props}>
                    <circle pathLength={100} cx="12" cy="12" r="5" strokeWidth="2" />
                    <path d="M12 7v10M7 12h10" strokeOpacity={0.5} />
                </svg>
             );
        case 'assembly':
            return (
                <svg {...props}>
                    <path pathLength={100} d="M12 18v2a2 2 0 01-2 2H6M20 4v8a2 2 0 01-2 2h-4M12 14v-4l-4-4" strokeWidth="2" />
                    <circle pathLength={100} cx="12" cy="14" r="2.5" fill={active ? COLOR_TOKENS.primary : 'none'} fillOpacity={0.5} />
                    <path d="M15 14l3 3" strokeOpacity={0.5} />
                </svg>
            );
        case 'source':
            return (
                <svg {...props}>
                     <path pathLength={100} d="M3 21h18M3 7l9-4 9 4M4 21V7m16 14V7M9 21v-4a3 3 0 016 0v4" />
                     <path d="M12 11v4M10 13h4" strokeOpacity={0.4} />
                </svg>
            );
        case 'process':
            return <svg {...props}><path pathLength={100} d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /><circle pathLength={100} cx="12" cy="12" r="4" /></svg>;
        case 'container':
            return (
                <svg {...props}>
                    <rect pathLength={100} x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                    <path pathLength={100} d="M3 9h18M9 21V9" strokeOpacity={0.5} />
                    <path d="M15 15l2 2" strokeOpacity={0.3} />
                </svg>
            );
        case 'input':
            return <svg {...props}><path pathLength={100} d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>;
        case 'output':
            return (
                <svg {...props}>
                    <path pathLength={100} d="M12 3v14m-5-5l5 5 5-5M4 21h16" strokeWidth="2" />
                    <path d="M7 12h10" strokeOpacity={0.3} />
                </svg>
            );
        default:
            return <svg {...props}><circle cx="12" cy="12" r="5" fill={active ? COLOR_TOKENS.primary : '#ccc'} /></svg>;
    }
};

const getBezierPath = (x1: number, y1: number, x2: number, y2: number, isLoop: boolean = false) => {
    if (isLoop) {
        return `M ${x1} ${y1} C ${x1} ${y1 + 400}, ${x2} ${y2 + 400}, ${x2} ${y2}`;
    }
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
};

export const FlowAnimator: React.FC<FlowAnimatorProps> = ({ 
    nodes, 
    edges, 
    activePhase = 0,
    title 
}) => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    const isActive = (phase?: number) => activePhase === 0 || phase === activePhase;

    // Camera Motion
    const cameraX = interpolate(frame, [0, 400], [0, -50]);
    const globalScale = 0.95;

    // Group Definitions for "Halos"
    const groups = [
        { id: 'recycler_group', label: 'Steel Recycler', x: 450, y: 300, w: 230, h: 480, phase: 2, logo: 'Vardhman' },
        { id: 'supplier_group', label: 'Tier 1/2/3 Supplier', x: 680, y: 300, w: 230, h: 480, phase: 3, logo: 'Satellite Forging' },
        { id: 'production_group', label: 'Vehicle Production', x: 880, y: 300, w: 180, h: 480, phase: 3, logo: 'Maruti Suzuki' },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: '#f5f5f7', overflow: 'hidden' }}>
            {/* Soft Studio Background Gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f0f4 100%)`,
            }} />
            
            {/* Header */}
            <div style={{
                position: 'absolute',
                top: 60,
                width: '100%',
                textAlign: 'center',
                zIndex: 300
            }}>
                <div style={{ 
                    opacity: interpolate(frame, [0, 20], [0, 1]),
                }}>
                    <Typography text={title} fontSize={48} color="#111" fontWeight={800} letterSpacing={1} />
                    <div style={{ 
                        width: 60, height: 4, background: COLOR_TOKENS.primary, margin: '15px auto',
                        transform: `scaleX(${interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' })})`
                    }} />
                </div>
            </div>

            <div style={{
                width: '100%',
                height: '100%',
                transform: `translateX(${cameraX}px) scale(${globalScale})`,
                transformOrigin: '50% 50%',
            }}>
                {/* 1. Draw Group Halos (The Green Boxes) */}
                {groups.map(group => {
                    const active = isActive(group.phase);
                    return (
                        <div key={group.id} style={{
                            position: 'absolute',
                            left: group.x * 1,
                            top: group.y * 0.8,
                            width: group.w * 1,
                            height: group.h * 0.8,
                            background: active ? 'rgba(150, 204, 57, 0.12)' : 'rgba(0,0,0,0.02)',
                            border: `2.5px solid ${active ? COLOR_TOKENS.primary : 'rgba(0,0,0,0.05)'}`,
                            borderRadius: '32px',
                            boxShadow: active ? `0 0 30px ${COLOR_TOKENS.primary}22` : 'none',
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingTop: '20px'
                        }}>
                           <div style={{ opacity: active ? 1 : 0.5 }}>
                                <Typography text={group.label} fontSize={16} color={active ? '#111' : '#999'} fontWeight={800} />
                           </div>
                            
                            {/* Logo at bottom of group */}
                            <div style={{ 
                                position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)',
                                opacity: active ? 1 : 0.4,
                                textAlign: 'center',
                                width: '100%'
                            }}>
                                <Typography text={group.logo} fontSize={14} color="#333" fontWeight={900} />
                                <div style={{ fontSize: 9, color: '#666', letterSpacing: 1, fontWeight: 700 }}>PARTNER LOGO</div>
                            </div>
                        </div>
                    );
                })}

                <svg width={width + 200} height={height} style={{ position: 'absolute' }}>
                    <defs>
                        <filter id="glow-light" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {edges.map((edge, i) => {
                        const fromNode = nodes.find(n => n.id === edge.from);
                        const toNode = nodes.find(n => n.id === edge.to);
                        if (!fromNode || !toNode) return null;

                        const active = isActive(edge.phase);
                        const x1 = fromNode.x * 1.8;
                        const y1 = fromNode.y * 1.3;
                        const x2 = toNode.x * 1.8;
                        const y2 = toNode.y * 1.3;
                        
                        const path = `M ${x1} ${y1} L ${x2} ${y2}`;

                        return (
                            <g key={`edge-${i}`} opacity={active ? 1 : 0.1} style={{ transition: 'opacity 0.8s' }}>
                                <path d={path} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="3" strokeLinecap="round" />
                                <path
                                    d={path}
                                    fill="none"
                                    stroke={COLOR_TOKENS.primary}
                                    strokeWidth="4"
                                    filter="url(#glow-light)"
                                    strokeDasharray="20 100"
                                    strokeDashoffset={frame * -8}
                                    opacity={active ? 1 : 0}
                                />
                            </g>
                        );
                    })}
                </svg>

                {nodes.map((node, i) => {
                    const active = isActive(node.phase);
                    const delay = i * 2;
                    const nodeSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
                    
                    return (
                        <div
                            key={node.id}
                            style={{
                                position: 'absolute',
                                left: node.x * 1.8,
                                top: node.y * 1.3,
                                transform: `translate(-50%, -50%) scale(${nodeSpring})`,
                                zIndex: active ? 200 : 10,
                                opacity: active ? 1 : 0.4,
                                transition: 'opacity 0.8s ease-in-out'
                            }}
                        >
                            <div style={{
                                width: 140,
                                height: 140,
                                background: active ? '#fff' : '#f0f0f0',
                                border: `2px solid ${active ? COLOR_TOKENS.primary : 'rgba(0,0,0,0.05)'}`,
                                borderRadius: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '15px',
                                boxShadow: active ? `0 15px 40px rgba(0,0,0,0.1), 0 0 20px ${COLOR_TOKENS.primary}22` : '0 4px 10px rgba(0,0,0,0.02)',
                                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}>
                                 <NodeIcon type={node.type} active={active} delay={delay} />
                                 <div style={{ marginTop: 12 }}>
                                    <Typography text={node.label} fontSize={14} color={active ? '#111' : '#666'} fontWeight={700} textAlign="center" />
                                 </div>
                            </div>

                            {/* Data Overlay */}
                            {node.metadata && active && activePhase === node.phase && (
                                <div style={{ position: 'absolute', left: 160, top: 0 }}>
                                    <DataOverlay data={node.metadata} delay={delay + 20} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
