import createAsyncLoader from './vendor/utility/createAsyncLoader.js';

import { DRACOLoader } from './vendor/three/loaders/DRACOLoader.js';
import { GLTFLoader } from './vendor/three/loaders/GLTFLoader.js';

export default async function loadModels() {

  const gltfLoader = new GLTFLoader();

  DRACOLoader.setDecoderPath( 'js/vendor/three/loaders/draco/' );
  gltfLoader.setDRACOLoader( new DRACOLoader() );

  const asyncLoader = createAsyncLoader( gltfLoader );

  const gltf = await asyncLoader.load( 'models/statues/rhino/rhino-draco.glb' );

  const rhino = gltf.scene.children[ 0 ];

  return {

    rhino,

  };

}
