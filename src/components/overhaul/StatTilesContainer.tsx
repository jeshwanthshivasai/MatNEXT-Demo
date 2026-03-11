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
                value="18,684"
                unit="Kgs"
                targetText="Out of 25,000 Kgs target"
                percentage={75}
                color="#10B981"
                icon={<Droplets size={20} />}
                delay={delay}
            />
            <StatTile
                label="Steel"
                subLabel="Recycled"
                value="730,070"
                unit="Kgs"
                targetText="Out of 800,000 Kgs target"
                percentage={91}
                color="#3B82F6"
                icon={<Zap size={20} />}
                delay={delay}
            />
            <StatTile
                label="ELVs"
                subLabel="Collected"
                value="6,607"
                unit="ELVs"
                targetText="Out of 7,500 ELVs target"
                percentage={88}
                color="#F59E0B"
                icon={<Truck size={20} />}
                delay={delay}
            />
            <StatTile
                label="Battery"
                subLabel="Recycled"
                value="0"
                unit=""
                targetText="Target data not available"
                percentage={0}
                color="#8B5CF6"
                icon={<Battery size={20} />}
                delay={delay}
            />
            <StatTile
                label="Non-"
                subLabel="Ferrous"
                value="0"
                unit=""
                targetText="Target data not available"
                percentage={0}
                color="#EC4899"
                icon={<Layers size={20} />}
                delay={delay}
            />
        </div>
    );
};
