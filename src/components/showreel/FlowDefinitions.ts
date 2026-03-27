export interface FlowNode {
    id: string;
    label: string;
    x: number;
    y: number;
    type: 'source' | 'process' | 'input' | 'output' | 'container' | 'heat' | 'rolling' | 'forging' | 'machining' | 'assembly' | 'wheel_hub';
    phase?: number; 
    icon?: string;
    subNodes?: string[]; 
    metadata?: {
        id?: string;
        location?: string;
        transport?: string;
        batchId?: string;
        invoiceId?: string;
        summary?: string;
    };
}

export interface FlowEdge {
    from: string;
    to: string;
    label?: string;
    phase?: number;
    isLoop?: boolean;
}

export const PLASTIC_FLOW_NODES: FlowNode[] = [
    { id: 'source_oem', label: 'OEM', x: 150, y: 220, type: 'source', phase: 1 },
    { id: 'source_dealer', label: 'Car Dealer', x: 150, y: 350, type: 'source', phase: 1 },
    { id: 'source_scrap', label: 'Scrap Dealer', x: 150, y: 480, type: 'source', phase: 1 },
    { id: 'source_collection', label: 'Collection Centre', x: 150, y: 610, type: 'source', phase: 1 },
    { 
        id: 'elv', label: 'ELV', x: 240, y: 430, type: 'process', phase: 1,
        metadata: { id: 'ELV-7729-PL', location: 'Collection Bay 4', transport: 'Flatbed Truck' }
    },
    { 
        id: 'scrapping', label: 'Scrapping Facility', x: 330, y: 430, type: 'process', phase: 1,
        metadata: { invoiceId: 'INV-PX-9901', id: 'ELV-7729-PL', location: 'Zone C - Industrial', transport: 'Rail Freight' }
    },
    { id: 'plastic_scrap', label: 'Plastic Scrap', x: 420, y: 480, type: 'process', phase: 2 },
    { id: 'virgin', label: 'Virgin', x: 420, y: 350, type: 'input', phase: 2 },
    { 
        id: 'recycler', label: 'Plastic Recycler', x: 580, y: 400, type: 'container', phase: 2, subNodes: ['sorting', 'grinding', 'pre_comp', 'post_comp'],
        metadata: { batchId: 'BAT-RE-442', invoiceId: 'INV-PX-9905', location: 'Recycling Plant A', transport: 'Truck' }
    },
    { 
        id: 'part_prod', label: 'Part Production', x: 720, y: 430, type: 'process', phase: 3,
        metadata: { batchId: 'BAT-PP-110', invoiceId: 'INV-MS-2281', location: 'Part Factory 2' }
    },
    { id: 'veh_prod', label: 'Vehicle Production', x: 800, y: 430, type: 'process', phase: 3 },
    { id: 'new_veh', label: 'New Vehicle', x: 880, y: 430, type: 'output', phase: 3 },
];

export const PLASTIC_FLOW_EDGES: FlowEdge[] = [
    { from: 'source_oem', to: 'elv', phase: 1 },
    { from: 'source_dealer', to: 'elv', phase: 1 },
    { from: 'source_scrap', to: 'elv', phase: 1 },
    { from: 'source_collection', to: 'elv', phase: 1 },
    { from: 'elv', to: 'scrapping', phase: 1 },
    { from: 'scrapping', to: 'plastic_scrap', phase: 2 },
    { from: 'virgin', to: 'recycler', phase: 2 },
    { from: 'plastic_scrap', to: 'recycler', phase: 2 },
    { from: 'recycler', to: 'part_prod', phase: 3 },
    { from: 'part_prod', to: 'veh_prod', phase: 3 },
    { from: 'veh_prod', to: 'new_veh', phase: 3 },
    { from: 'new_veh', to: 'source_oem', isLoop: true, phase: 3 },
];

export const STEEL_FLOW_NODES: FlowNode[] = [
    // Top Row: Recovery Sources
    { id: 'src_oem', label: 'OEM', x: 100, y: 180, type: 'source', phase: 1 },
    { id: 'src_dealer', label: 'Car Dealer', x: 100, y: 320, type: 'source', phase: 1 },
    { id: 'src_scrap', label: 'Scrap Dealer', x: 100, y: 460, type: 'source', phase: 1 },
    { id: 'src_collection', label: 'Collection Centre', x: 100, y: 600, type: 'source', phase: 1 },

    // Middle Row: Core Flow
    { 
        id: 'elv', label: 'ELV', x: 220, y: 440, type: 'process', phase: 1,
        metadata: { id: 'ELV-4838-ST', location: 'GPS 19.07, 72.87', transport: 'Flatbed Truck' }
    },
    { 
        id: 'scrapping', label: 'Scrapping Facility', x: 320, y: 440, type: 'process', phase: 1,
        metadata: { invoiceId: 'INV-ST-8821', id: 'ELV-4838-ST', location: 'Industrial Zone B' }
    },
    { id: 'sponge_iron', label: 'Sponge Iron', x: 420, y: 320, type: 'input', phase: 2 },
    { id: 'steel_bale', label: 'Steel Car Bale', x: 420, y: 560, type: 'process', phase: 2 },
    
    // Group: Steel Recycler (Vardhman)
    { 
        id: 'recycler', label: 'Steel Recycler', x: 580, y: 440, type: 'container', phase: 2, subNodes: ['heat', 'rolling', 'bars'],
        metadata: { batchId: 'BAT-HT-991', invoiceId: 'INV-ST-8825', location: 'Vardhman Plant', transport: 'Rail' }
    },

    // Group: Tier 1/2/3 Supplier (Satellite Forging)
    { 
        id: 'supplier', label: 'Tier 1/2/3 Supplier', x: 740, y: 440, type: 'container', phase: 3, subNodes: ['forging', 'machining', 'assembly', 'wheel_hub'],
        metadata: { batchId: 'BAT-SU-552', invoiceId: 'INV-MS-3310', summary: 'Satellite Forging' }
    },

    // Manufacturing & Final
    { id: 'veh_prod', label: 'Vehicle Production', x: 880, y: 440, type: 'assembly', phase: 3 },
    { id: 'new_veh', label: 'New Vehicle', x: 920, y: 220, type: 'output', phase: 3 },
];

export const STEEL_FLOW_EDGES: FlowEdge[] = [
    { from: 'src_oem', to: 'elv', phase: 1 },
    { from: 'src_dealer', to: 'elv', phase: 1 },
    { from: 'src_scrap', to: 'elv', phase: 1 },
    { from: 'src_collection', to: 'elv', phase: 1 },
    { from: 'elv', to: 'scrapping', phase: 1 },
    { from: 'scrapping', to: 'steel_bale', phase: 2 },
    { from: 'sponge_iron', to: 'recycler', phase: 2 },
    { from: 'steel_bale', to: 'recycler', phase: 2 },
    { from: 'recycler', to: 'supplier', phase: 3 },
    { from: 'supplier', to: 'veh_prod', phase: 3 },
    { from: 'veh_prod', to: 'new_veh', phase: 3 },
    { from: 'new_veh', to: 'src_oem', isLoop: true, phase: 3 },
];
