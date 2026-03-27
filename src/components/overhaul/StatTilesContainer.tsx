import React from 'react';
import { StatTile } from './StatTile';
import {
    Droplets,
    Zap,
    Truck,
    Battery,
    Layers
} from 'lucide-react';

interface StatTilesContainerProps {
    delay?: number;
}

export const StatTilesContainer: React.FC<StatTilesContainerProps> = ({ delay = 0 }) => {
    return (
        <div style={{
            display: 'flex',
            gap: 25,
            width: '100%',
            height: '100%',
            padding: 0,
            boxSizing: 'border-box',
        }}>
            <StatTile
                label="Plastic"
                subLabel="Recycled"
                value="20,552"
                unit="Kgs"
                targetText="Out of 25,000 Kgs target"
                percentage={82}
                color="#10B981"
                icon={<Droplets size={20} />}
                delay={delay}
            />
            <StatTile
                label="Steel"
                subLabel="Recycled"
                value="803,077"
                unit="Kgs"
                targetText="Out of 800,000 Kgs target"
                percentage={100}
                color="#3B82F6"
                icon={<Zap size={20} />}
                delay={delay}
            />
            <StatTile
                label="ELVs"
                subLabel="Collected"
                value="7,268"
                unit="ELVs"
                targetText="Out of 7,500 ELVs target"
                percentage={97}
                color="#F59E0B"
                icon={<Truck size={20} />}
                delay={delay}
            />
            <StatTile
                label="Battery"
                subLabel="Recycled"
                value="4,200"
                unit="Kgs"
                targetText="Out of 5,000 Kgs target"
                percentage={84}
                color="#8B5CF6"
                icon={<Battery size={20} />}
                delay={delay}
            />
            <StatTile
                label="Non-"
                subLabel="Ferrous"
                value="12,500"
                unit="Kgs"
                targetText="Out of 15,000 Kgs target"
                percentage={83}
                color="#EC4899"
                icon={<Layers size={20} />}
                delay={delay}
            />
        </div>
    );
};
