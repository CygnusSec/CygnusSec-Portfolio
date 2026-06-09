import BlackHoleBackground from './backgrounds/BlackHoleBackground';
import CloudBackground from './backgrounds/CloudBackground';
import CubeBackground from './backgrounds/CubeBackground';
import EmeraldBackground from './backgrounds/EmeraldBackground';
import HeliosOrbitBackground from './backgrounds/HeliosOrbitBackground';
import HypersphereBackground from './backgrounds/HypersphereBackground';
import LiquidCoreBackground from './backgrounds/LiquidCoreBackground';
import MagnetarBackground from './backgrounds/MagnetarBackground';
import RainBackground from './backgrounds/RainBackground';
import ResilientNodeBackground from './backgrounds/ResilientNodeBackground';
import SphereBackground from './backgrounds/SphereBackground';
import TesseractBackground from './backgrounds/TesseractBackground';

const backgrounds = {
  cube: CubeBackground,
  sphere: SphereBackground,
  tesseract: TesseractBackground,
  liquid: LiquidCoreBackground,
  helios: HeliosOrbitBackground,
  blackhole: BlackHoleBackground,
  emerald: EmeraldBackground,
  node: ResilientNodeBackground,
  hypersphere: HypersphereBackground,
  cloud: CloudBackground,
  magnetar: MagnetarBackground,
  rain: RainBackground,
};

const MatrixBackground = ({ variant = 'cube' }) => {
  const Background = backgrounds[variant] || CubeBackground;
  return <Background />;
};

export default MatrixBackground;
