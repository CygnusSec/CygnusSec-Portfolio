import BlackHoleBackground from './backgrounds/BlackHoleBackground';
import CloudBackground from './backgrounds/CloudBackground';
import CubeBackground from './backgrounds/CubeBackground';
import EmeraldBackground from './backgrounds/EmeraldBackground';
import HeliosOrbitBackground from './backgrounds/HeliosOrbitBackground';
import HyperBloomBackground from './backgrounds/HyperBloomBackground';
import HypersphereBackground from './backgrounds/HypersphereBackground';
import JanusBackground from './backgrounds/JanusBackground';
import LiquidCoreBackground from './backgrounds/LiquidCoreBackground';
import MagnetarBackground from './backgrounds/MagnetarBackground';
import NeuralEyeBackground from './backgrounds/NeuralEyeBackground';
import NeuralNet1Background from './backgrounds/NeuralNet1Background';
import RainBackground from './backgrounds/RainBackground';
import ResilientNodeBackground from './backgrounds/ResilientNodeBackground';
import SpacetimeBlackHoleBackground from './backgrounds/SpacetimeBlackHoleBackground';
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
  janus: JanusBackground,
  bloom: HyperBloomBackground,
  spacetime: SpacetimeBlackHoleBackground,
  neuralnet1: NeuralNet1Background,
  neuraleye: NeuralEyeBackground,
  rain: RainBackground,
};

const MatrixBackground = ({ variant = 'cube' }) => {
  const Background = backgrounds[variant] || CubeBackground;
  return <Background />;
};

export default MatrixBackground;
