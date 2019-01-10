function loadModels( loader, scene ) {

  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  const position = new THREE.Vector3( 0, 0, 0  );
  const rotation = new THREE.Euler( 0, 0, 0 );
  const scale = new THREE.Vector3( 0.05, 0.05, 0.05 );
  loader.load( 'models/Parrot.glb', gltf => onGLTFLoad( gltf, position, rotation, scale, scene ), null, onError );

}