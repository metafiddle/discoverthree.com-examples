
function initScene() {

  const app = new THREE_APP( '#container' );

  app.init();

  app.scene.background = new THREE.Color( 0x8FBCD4 );
  app.scene.fog = new THREE.Fog( 0x8FBCD4, 200, 230 );
  app.camera.position.set( -20, 20, 50 );

  const lights = createLights( app.scene );

  const targets = createMeshes( app.scene );

  setupLightTargetControls( lights, targets );


  app.start();
}

initScene();