import React from 'react';
import {
  Code,
  Globe,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Award,
  Phone,
  CheckCircle,
  Layers,
  BarChart,
  Palette,
  ShoppingBag,
  Cpu,
  Rocket,
  Search,
  Clock,
  Briefcase,
  LucideProps,
} from 'lucide-react';
import { IconNameType } from '../types';

interface DynamicIconProps extends LucideProps {
  name?: IconNameType | string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'code':
      return <Code {...props} />;
    case 'globe':
      return <Globe {...props} />;
    case 'sparkles':
      return <Sparkles {...props} />;
    case 'shield':
      return <Shield {...props} />;
    case 'zap':
      return <Zap {...props} />;
    case 'trending-up':
      return <TrendingUp {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'award':
      return <Award {...props} />;
    case 'phone':
      return <Phone {...props} />;
    case 'check-circle':
      return <CheckCircle {...props} />;
    case 'layers':
      return <Layers {...props} />;
    case 'bar-chart':
      return <BarChart {...props} />;
    case 'palette':
      return <Palette {...props} />;
    case 'shopping-bag':
      return <ShoppingBag {...props} />;
    case 'cpu':
      return <Cpu {...props} />;
    case 'rocket':
      return <Rocket {...props} />;
    case 'search':
      return <Search {...props} />;
    case 'clock':
      return <Clock {...props} />;
    case 'briefcase':
      return <Briefcase {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};
